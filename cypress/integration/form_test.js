describe("Testing form inputs",() =>{

// Visit localhost
    beforeEach(() => {
      cy.visit("http://localhost:3000/pizza");
    });


    it("Check input values in the form",() => {

        // Check username
        cy.get('[data-cy = nameinput]')
        .type('Maby').should('have.value', 'Maby')

        // Check dropdown
        cy.get('[data-cy = sizedropdown]')
        .select('Regular')
        .should('have.value', 'Regular')
        

        // Click on top_cheese
        cy.get('[data-cy = top_cheese]').check()
        
        // Click on tomatosause
        cy.get('[data-cy = tomatosause]').check()
        
        // Click on mushrooms
        cy.get('[data-cy = mushrooms]').check()

        // Click on turkey
        cy.get('[data-cy = turkey]').check()
        
        // Check special text
        cy.get('[data-cy = specialtext]')
        .type('Extra details')
                
        // Click on characteristics of the order
        cy.get('[data-cy = agree]').check().should('be.checked')

        // Click on submit order button
        cy.get('[data-cy = orderbutton]').click()

      });

}) ;


  // https://docs.cypress.io/api/commands/select#Text-Content
  // https://www.youtube.com/watch?v=FHcJJJPu1lE