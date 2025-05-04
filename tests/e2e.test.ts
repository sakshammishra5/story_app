describe('Instagram Stories E2E Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });

    it('should display story previews', () => {
      cy.get('.story-preview').should('have.length', 4);
    });

    it('should open a story on click', () => {
      cy.get('.story-preview').first().click();
      cy.get('.story-viewer').should('not.have.class', 'hidden');
      cy.get('.story-image').should('be.visible');
    });

    it('should navigate to next story on right tap', () => {
      cy.get('.story-preview').first().click();
      cy.get('.tap-area.right').click();
      cy.get('.story-image').should('have.attr', 'src').should('include', 'random=2');
    });

    it('should navigate to previous story on left tap', () => {
      cy.get('.story-preview').eq(1).click();
      cy.get('.tap-area.left').click();
      cy.get('.story-image').should('have.attr', 'src').should('include', 'random=1');
    });

    it('should auto-advance to next story after 5 seconds', () => {
      cy.get('.story-preview').first().click();
      cy.wait(5100);
      cy.get('.story-image').should('have.attr', 'src').should('include', 'random=2');
    });
  });