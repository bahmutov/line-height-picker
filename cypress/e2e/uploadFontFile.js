describe('Uploading a font file on landing page', () => {
  it('takes the user to x-height page and shows the font name', () => {
    // This test ends up with an error message in Cypress, but the test does pass.

    // Setup
    const fontFileName = 'RobotoSlab-Light.ttf';
    const expectedFontName = 'Roboto Slab';

    // Execute
    cy.visit('/');
    cy.findByText(/upload/i).click(); // Just to make sure that the user can find and then click the upload button. This command does not launch the file upload dialog box in Cypress. So we need the next command:
    cy.findByTestId('hiddenFileInput').attachFile({
      filePath: fontFileName,
      mimeType: 'font/ttf',
      encoding: 'binary',
    }); // This command does not exactly reflect how the user interacts with our UI. But there's no other way to simulate it.

    // Verify
    cy.url().should('eq', `${Cypress.config().baseUrl}/x-height`);
    cy.findByTestId('UserDataDisplay').should('have.text', expectedFontName);
  });
});
