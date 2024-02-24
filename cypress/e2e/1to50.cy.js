const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]

before(() => {
    cy.visit("https://zzzscore.com/1to50/en/");
});

describe("Traveloka Take Home Test", () => {
    it("Does Challenge using Automation Test for problem no.4", {scrollBehavior: "center"}, () => {
        for(let i=1; i <= numbers.length; i++) {
            cy.get(`div[style="opacity: 1;"]`).contains(i).scrollIntoView().click({force: true});
            // cy.get(`div[style="opacity: 1;"]`).contains(i).scrollIntoView().trigger("click"); // this code has the same effect as above
        }
    });        
});