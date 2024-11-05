describe('Password Recovery Box', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/recovery'); 
    });
  
    it('повинен показувати помилку, якщо паролі не співпадають', () => {
      cy.get('input[placeholder="Логін"]').type('testuser');
      cy.get('input[placeholder="Новий пароль"]').type('password123');
      cy.get('input[placeholder="Повторіть пароль"]').type('password124');
      cy.get('.next-button').click();
      cy.get('.error-message').should('contain', 'Паролі не співпадають');
    });
  
    it('повинен надсилати форму з правильними даними і перенаправляти на головну сторінку при успішному відновленні', () => {
      cy.intercept('POST', 'http://localhost:8082/change-password', {
        statusCode: 200,
        body: { message: 'Пароль успішно змінено' }
      }).as('passwordChange');
  
      cy.get('input[placeholder="Логін"]').type('testuser');
      cy.get('input[placeholder="Новий пароль"]').type('password123');
      cy.get('input[placeholder="Повторіть пароль"]').type('password123');
      cy.get('.next-button').click();
  
      cy.wait('@passwordChange').its('request.body').should('deep.equal', {
        username: 'testuser',
        newPassword: 'password123'
      });
  
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Пароль успішно змінено');
      });
  
      cy.url().should('eq', 'http://localhost:8081/');
    });
  
    it('повинен показувати повідомлення про помилку при невдалому відновленні пароля', () => {
      cy.intercept('POST', 'http://localhost:8082/change-password', {
        statusCode: 400,
        body: { message: 'Невірний логін' }
      }).as('passwordChangeFail');
  
      cy.get('input[placeholder="Логін"]').type('wronguser');
      cy.get('input[placeholder="Новий пароль"]').type('password123');
      cy.get('input[placeholder="Повторіть пароль"]').type('password123');
      cy.get('.next-button').click();
  
      cy.wait('@passwordChangeFail');
      cy.get('.error-message').should('contain', 'Невірний логін');
    });
  });
  