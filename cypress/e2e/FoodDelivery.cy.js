describe('FoodDelivery Component Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/foodDelivery');
    });
  
    it('перевіряє відкриття кошика', () => {
      cy.get('.cart-button').click();
      cy.get('.cart-widget').should('be.visible');
    });
  
    it('перевіряє пошук товару', () => {
      cy.get('.search-bar').type('Burger');
      cy.get('.menu-item[alt="Burger"]').should('exist');
    });
  
    it('перевіряє додавання товару до кошика', () => {
      cy.get('.menu-item[alt="Burger"]').click();
      cy.get('.cart-button').click();
      cy.get('.cart-item').should('exist').contains('Burger');
    });
  
    it('перевіряє збільшення кількості товару в кошику', () => {
      cy.get('.menu-item[alt="Burger"]').click();
      cy.get('.cart-button').click();
      cy.get('.cart-item button').contains('+').click();
      cy.get('.cart-item').should('contain', '2');
    });
  
    it('перевіряє видалення товару з кошика при кількості 0', () => {
      cy.get('.menu-item[alt="Burger"]').click();
      cy.get('.cart-button').click();
      cy.get('.cart-item button').contains('+').click();
      cy.get('.cart-item button').contains('-').click();
      cy.get('.cart-item').should('not.exist');
    });
  });
  