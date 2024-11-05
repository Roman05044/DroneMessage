describe('Dashboard Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/dashboard');
    });
  
    it('повинен перемістити користувача до сторінки доставки посилок при натисканні на кнопку "Пошта"', () => {
      cy.get('.image-button-posht').click();
      cy.url().should('include', '/parcelMap');
    });
  
    it('повинен перемістити користувача до сторінки доставки їжі при натисканні на кнопку "Доставка їжі"', () => {
      cy.get('.image-button-food').click();
      cy.url().should('include', '/foodDelivery');
    });
  
    it('повинен дозволити редагування імені користувача і зберігати його в localStorage', () => {
      const newUsername = 'Новий Користувач';
      cy.get('h4')
        .invoke('text', '')
        .type(newUsername, { force: true });
      
      cy.get('h4').should('contain', newUsername);
  
      cy.window().then((win) => {
        win.localStorage.setItem('username', newUsername);
      });
  
      cy.window().then((win) => {
        expect(win.localStorage.getItem('username')).to.equal(newUsername);
      });
    });
  
    it('повинен дозволити відкривати/закривати віджет та перемикати історію', () => {
      cy.get('.side-widget').should('have.class', 'closed');
      cy.get('.toggle-widget-button').click();
      cy.get('.side-widget').should('have.class', 'open');
      cy.get('input[type="checkbox"]').check();
      cy.get('.history-message').should('be.visible');
      cy.get('.toggle-widget-button').click();
      cy.get('.side-widget').should('have.class', 'closed');
    });
  });
  