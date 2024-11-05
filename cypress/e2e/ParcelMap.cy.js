describe('ParcelMap Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/parcelMap');
    });
  
    it('перевіряє відображення поштових відділень на карті', () => {
      cy.get('.parcel-locker-point').should('have.length', 15);
    });
  
    it('перевіряє функціональність кнопки переходу на головну сторінку', () => {
      cy.get('.home-button').click();
      cy.url().should('include', '/dashboard');
    });
  
    it('перевіряє пошук та вибір відділення як початкову точку', () => {
      cy.get('input[placeholder="Пошук відділення, поштомату (Початкова точка)"]').type('1');
      cy.get('.suggestion-item').first().click();
      cy.get('input[placeholder="Пошук відділення, поштомату (Початкова точка)"]').should('have.value', '1 - Нова Пошта 1');
    });
  
    it('перевіряє пошук та вибір відділення як кінцеву точку', () => {
      cy.get('input[placeholder="Пошук відділення, поштомату (Кінцева точка)"]').type('2');
      cy.get('.suggestion-item').first().click();
      cy.get('input[placeholder="Пошук відділення, поштомату (Кінцева точка)"]').should('have.value', '2 - Нова Пошта 2');
    });
  
    it('перевіряє вибір відділення на карті після фокусування на полі', () => {
      cy.get('input[placeholder="Пошук відділення, поштомату (Початкова точка)"]').focus();
      cy.get('.parcel-locker-point[title="Parcel Locker 1"]').click();
      cy.get('input[placeholder="Пошук відділення, поштомату (Початкова точка)"]').should('have.value', '1 - Нова Пошта 1');
    });
  });
  