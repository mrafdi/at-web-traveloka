// const { before } = require("cypress/types/lodash");
// const { describe } = require("mocha");

// const { it } = require("mocha");

const d = new Date();
let day = d.getDate();

before(() => {
    cy.visit("https://www.traveloka.com/");
});

describe("Traveloka Take Home Test", () => {
    it("Does Automation Test for problem no.3", {scrollBehavior: "center"}, () => {
        // -- Select Cars Product -- //

        cy.get(`a[href="/en-en/car-rental"]`).eq(0).click();
        cy.url().should("include", "https://www.traveloka.com/en-en/car-rental");

        // -- Select tab Without Driver -- //

        cy.contains("Without Driver").click();
        cy.get(`div[aria-checked="true"] div[dir="auto"]`).contains("Without Driver");

        // -- Select Pick-up Location (Jakarta) -- //

        cy.get("input[placeholder]").type("Jakarta", {force: true});
        cy.wait(5000).get(`div[data-testid="rental-search-form-location-group"] div[aria-label="Jakarta"]`).eq(0).click();

        // -- Select Pick-up Date & Time (D+1, 12:00) -- //

        cy.get("input[autocapitalize]").eq(1).click();
        cy.get(`div[data-month="1"]`).contains(day+1).click()
        cy.get("input[autocapitalize]").eq(2).click();
        cy.contains("Hour").siblings("div").contains("12").click();
        cy.contains("Minute").siblings("div").children("div").contains("0").click();
        cy.get(".css-1dbjc4n").contains("Done").click();

        // -- Select Drop-off Date & Time (D+3, 13.00) -- //

        cy.get("input[autocapitalize]").eq(3).click();
        cy.get(`div[data-month="1"]`).contains(day+3).click({force:true})
        cy.get("input[autocapitalize]").eq(4).click();
        cy.contains("Hour").siblings("div").contains("13").click();
        cy.contains("Minute").siblings("div").children("div").contains("0").click();
        cy.get(".css-1dbjc4n").contains("Done").click();

        // -- Click button Search Car -- //

        cy.get(".css-1dbjc4n").contains("Search Car").click({force: true});
        cy.url().should("include", "car-rental/search");

        // -- Select Car -- //

        cy.wait(2000).get(".css-1dbjc4n.r-1ihkh82.r-1q2s4rl.r-ttdzmv").should("be.visible");
        cy.get("h2").contains("Car Rental Without Driver").should("be.visible");
        cy.get("h2~div[dir]").contains("Jakarta").should("be.visible");
        // get Car Name
        cy.get(".css-1dbjc4n.r-1ihkh82.r-1q2s4rl.r-ttdzmv .css-1dbjc4n.r-18u37iz.r-ymttw5.r-95jzfe h3").eq(0).then(($text) => {
            const txt = $text.text()
            cy.writeFile(`cypress/fixtures/testData/carType.txt`, txt)
        });
        // get Provider number
        cy.get(".css-1dbjc4n.r-1ihkh82.r-1q2s4rl.r-ttdzmv .css-1dbjc4n.r-18u37iz.r-ymttw5.r-95jzfe").contains("providers available").eq(0).then(($text) => {
            const txt = $text.text().charAt(0)
            cy.writeFile(`cypress/fixtures/testData/totalProvider.txt`, txt)
        });
        cy.get(".css-1dbjc4n.r-1ihkh82.r-1q2s4rl.r-ttdzmv .css-1dbjc4n.r-18u37iz.r-ymttw5.r-95jzfe").eq(0).contains("Continue").click({force: true}); // select first car

        // -- Select Car Provider -- //

        // check the shown car is the same as selected on search page
        cy.readFile(`cypress/fixtures/testData/carType.txt`).then((text) =>{
            cy.log(text);
            cy.get(".css-1dbjc4n .r-13awgt0 .r-tskmnb h4").should("contain", text);
        });
        cy.get(".css-1dbjc4n .r-1wzrnnt h2").eq(0).contains("Select Rental Provider").should("be.visible");
        // check the list has the same number of provider as stated on search page
        cy.readFile(`cypress/fixtures/testData/totalProvider.txt`).then((text) =>{
            cy.log(text);
            const number = Number(text)
            cy.get(".r-136ojw6 > .css-1dbjc4n.r-1wzrnnt > div").its("length").should("equal", number+4); // +4 since the other 4 div element is not the provider list
        });
        // get the first provider name
        cy.get(".r-136ojw6 > .css-1dbjc4n.r-1wzrnnt > div:nth-child(5) h3").then(($text) => {
            const txt = $text.text()
            cy.writeFile(`cypress/fixtures/testData/providerName.txt`, txt)
        });
        cy.get(".r-136ojw6 > .css-1dbjc4n.r-1wzrnnt > div:nth-child(5)").contains("Continue").click({force: true}); // select first provider

        // -- Click button Continue in Product Detail -- //
        /* This step is invalid because user need to select pick-up and drop-off location first 
            I only give steps of assertion here
        */
        
        cy.url().should("include", "car-rental/detail");
        // check car name whether the same as selected before or not
        cy.readFile(`cypress/fixtures/testData/carType.txt`).then((text) =>{
            cy.log(text);
            cy.get(".css-1dbjc4n.r-14lw9ot.r-kdyh1x.r-b4qz5r.r-1udh08x.r-nsbfu8 h2").should("contain", text);
        });
        // check provider name whether the same as selected before or not
        cy.readFile(`cypress/fixtures/testData/providerName.txt`).then((text) =>{
            cy.log(text);
            cy.get(".css-1dbjc4n.r-14lw9ot.r-kdyh1x.r-b4qz5r.r-1udh08x.r-nsbfu8 .css-901oao").eq(1).should("contain", text);
        });

        // -- Select Pick-up Location in “Rental Office” -- //

        const pickupSection=".css-1dbjc4n.r-14lw9ot.r-kdyh1x.r-b4qz5r.r-1ifxtd0.r-nsbfu8.r-136ojw6"
        cy.get(pickupSection).contains("Rental Office").click();
        cy.get(`${pickupSection} .css-1dbjc4n.r-13awgt0.r-18u37iz.r-edyy15`).click(); // click dropdown
        cy.get(`${pickupSection} div[tabindex="0"] .css-1dbjc4n .r-13awgt0`).eq(2).click(); // click first item on dropdown

        // -- Select Drop-off Location in “Other Location” -- //

        const dropOffSection=".css-1dbjc4n.r-14lw9ot.r-kdyh1x.r-b4qz5r.r-1ifxtd0.r-nsbfu8.r-184en5c"
        cy.get(dropOffSection).contains("Other Locations").click();
        cy.get(`${dropOffSection} input`).type("mall kelapa gading", {force: true});
        cy.get(`div[aria-label="Kelapa Gading Mall"]`).click();

        // -- Input Pick-up/Drop-off notes is optional -- //
        
        cy.get(`${dropOffSection} textarea`).type("MKG 3", {force: true});

        // -- Click button Book Now -- //
        /* The button is not "Book Now" but "Continue"
            In this section  I will click the Continue button, since Book Now is nowhere to be seen, and will result to error
        */

        cy.get("div[dir=auto].css-901oao.css-bfa6kz.r-jwli3a.r-t1w4ow.r-cygvgh.r-b88u0q.r-1iukymi.r-q4m81j").eq(1).contains("Continue").click({force: true});

        /*
            From here onward, when I want to run the Cypress from my local PC, there's a bot checker after the last step. So it may return error/failed beyond this point
            Here I added cy.log command to mark the point
        */
       cy.log("If there's any bot checker that appear, then the test will fail/error");

        // -- Fill Contact Details -- //

        cy.wait(10000) // wait for loading page
        cy.url().should("include", "/booking");
        cy.get(".css-1dbjc4n h1").contains("Your Booking").should("be.visible");
        cy.get(`input[aria-labelledby="name.full"]`).eq(0).type("Tester Rafdi", {force: true});
        cy.get(`input[aria-label="Phone Number"]`).eq(0).type("08211111111", {force: true});
        cy.get(`input[aria-labelledby="emailAddress"]`).type("tester_rafdi@mailinator.com", {force: true});

        // -- Fill Driver Details -- //

        cy.get(".r-30o5oe.r-1niwhzg.r-1yadl64.r-1p0dtai.r-t1w4ow.r-ubezar").select(1, {force: true});
        cy.get(`input[aria-labelledby="name.full"]`).eq(1).type("Tester Rafdi", {force: true});
        cy.get(`input[aria-label="Phone Number"]`).eq(1).type("08211111111", {force: true});

        // -- Click Continue -- //

        cy.get("div[dir=auto]").contains("Continue").eq(0).click({force: true});

        // -- Add a special request is optional -- //

        cy.get("textarea").type("Black colour please", {force: true});

        // -- Check all rental requirements -- //

        cy.get(".css-1dbjc4n.r-1loqt21.r-1otgn73.r-1i6wzkk.r-lrvibr").eq(0).click();
        cy.get("div[dir=auto]").contains("Check All").click({force: true});
        cy.get("div[dir=auto]").contains("Save").click({force: true});

        // -- Click Continue -- //
        /* Here means Click the "Continue to Payment" button first , I assume?  */

        cy.get("div[dir=auto]").contains("Continue to Payment").click({force: true});
        cy.get("div[dir=auto]").contains("Continue").click({force: true}); // confirmation popup

        // -- Select payment method and proceed payment -- //

        cy.get(`div[tabindex="-1"] input`).eq(0).type("0123455678", {force: true});
        cy.get(`div[tabindex="-1"] input`).eq(1).type("0729", {force: true});
        cy.get(`div[tabindex="-1"] input`).eq(2).type("5678", {force: true});
        cy.get(`div[tabindex="-1"] input`).eq(3).type("Tester Aja", {force: true});
        /* This code below is commented because it will really booking a rental car, since I'm not provided with testing environment/credentials/data 
            NEVER do testing on PROD envi!
        */
        // cy.get("div[dir=auto]").contains("Pay with Credit/Debit Card").click({force: true});
    });
});