describe('Компонент LoginBox', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081');
    });
  
    it('повинен відображати форму для входу', () => {
      cy.get('h2').should('contain.text', 'DroneMessage');
      cy.get('input[placeholder="Логін"]').should('be.visible');
      cy.get('input[placeholder="Пароль"]').should('be.visible');
      cy.get('button.login-button').should('contain.text', 'Увійти');
      cy.get('a').contains('Реєстрація').should('be.visible');
      cy.get('a').contains('Забули пароль?').should('be.visible');
    });
  
    it('повинен показувати помилку при неправильних облікових даних', () => {
      cy.get('input[placeholder="Логін"]').type('wronguser');
      cy.get('input[placeholder="Пароль"]').type('wrongpassword');
      cy.get('button.login-button').click();
      cy.get('.error-message').should('be.visible')
        .and('contain.text', 'Невірний логін або пароль');
    });
  
    it('повинен здійснювати вхід і перенаправляти на панель управління', () => {
      cy.intercept('POST', 'http://localhost:8082/login', {
        statusCode: 200,
        body: { message: 'Успішний вхід' }
      }).as('loginRequest');
  
      cy.get('input[placeholder="Логін"]').type('1');
      cy.get('input[placeholder="Пароль"]').type('1');
      cy.get('button.login-button').click();
      cy.wait('@loginRequest');
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Успішний вхід');
      });
      cy.url().should('include', '/dashboard');
    });
  
    it('повинен обробляти серверні помилки належним чином', () => {
      cy.intercept('POST', 'http://localhost:8082/login', {
        statusCode: 500,
        body: { message: 'Серверна помилка' }
      }).as('loginRequest');
  
      cy.get('input[placeholder="Логін"]').type('user');
      cy.get('input[placeholder="Пароль"]').type('password');
      cy.get('button.login-button').click();
      cy.wait('@loginRequest');
      cy.get('.error-message').should('contain.text', 'Серверна помилка');
    });
  });
  