describe('Компонент RegistrationBox', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/register');
    });
  
    it('повинен відображати форму для реєстрації', () => {
      cy.get('h2').should('contain.text', 'Реєстрація');
      cy.get('input[placeholder="Логін"]').should('be.visible');
      cy.get('input[placeholder="Пароль"]').should('be.visible');
      cy.get('input[placeholder="Повторіть пароль"]').should('be.visible');
      cy.get('button.register-button').should('contain.text', 'Створити');
      cy.get('a').contains('Вже є обліковий запис?').should('be.visible');
    });
  
    it('повинен показувати помилку, якщо паролі не співпадають', () => {
      cy.get('input[placeholder="Логін"]').type('newuser');
      cy.get('input[placeholder="Пароль"]').type('password123');
      cy.get('input[placeholder="Повторіть пароль"]').type('password456');
      cy.get('button.register-button').click();
      cy.get('.error-message').should('be.visible')
        .and('contain.text', 'Паролі не співпадають');
    });
  
    it('повинен здійснювати реєстрацію та перенаправляти на головну сторінку при успіху', () => {
      cy.intercept('POST', 'http://localhost:8082/register', {
        statusCode: 200,
        body: { message: 'Реєстрація успішна' }
      }).as('registerRequest');
  
      cy.get('input[placeholder="Логін"]').type('newuser');
      cy.get('input[placeholder="Пароль"]').type('password123');
      cy.get('input[placeholder="Повторіть пароль"]').type('password123');
      cy.get('button.register-button').click();
  
      cy.wait('@registerRequest');
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Реєстрація успішна');
      });
      cy.url().should('eq', 'http://localhost:8081/');
    });
  
    it('повинен показувати повідомлення про помилку, якщо сервер повертає помилку', () => {
      cy.intercept('POST', 'http://localhost:8082/register', {
        statusCode: 500,
        body: { message: 'Серверна помилка' }
      }).as('registerRequest');
  
      cy.get('input[placeholder="Логін"]').type('user');
      cy.get('input[placeholder="Пароль"]').type('password');
      cy.get('input[placeholder="Повторіть пароль"]').type('password');
      cy.get('button.register-button').click();
  
      cy.wait('@registerRequest');
      cy.get('.error-message').should('contain.text', 'Серверна помилка');
    });
  });
  