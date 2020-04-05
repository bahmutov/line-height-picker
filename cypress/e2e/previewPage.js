const userData = {
  xHeight: 10,
  xHeightRatio: 1,
  lineHeightRatio: 3,
};

const newUserData = {
  xHeight: 12,
  xHeightRatio: 2,
  lineHeightRatio: 7,
};

describe('Preview Page in demo', () => {
  // setup
  const fontFamily = `Open Sans`;
  const fontWeight = `400`;
  const OpenSansFontMetrics = {
    unitsPerEm: 2048,
    sxHeight: 1096,
  };

  beforeEach(() => {
    cy.visit('/x-height');
    cy.findByLabelText(/x-height/i).type(userData.xHeight);
    cy.findByText(/scale/i).click();
    cy.findByLabelText(/x-height/i).type(userData.xHeightRatio);
    cy.findByLabelText(/line-height/i, {selector: 'input'}).type(
      userData.lineHeightRatio,
    );
    cy.findByText(/preview/i).click();
  });

  it('shows the UI components correctly', () => {
    cy.checkHeaderFooterRendering(); // See support/commands.js
    cy.findByText(/preview/i).should('exist');
    cy.findByTestId('sampleParagraph1').should('exist');
    cy.findByTestId('sampleParagraph2').should('exist');
    cy.findByText(/excerpt/i).should('exist');
    cy.findByTestId('FontNameDisplay').should('exist');
    cy.findByText(/change font/i).should('exist');
    cy.findByLabelText(/line-height/i, {selector: 'input'}).should('exist');
  });

  it('takes the user to the CSS page after clicking the button for it', () => {
    cy.findByText(/css/i).click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/css`);
  });

  it('allows the user to change font by clicking the "change font" button', () => {
    // Setup
    const fontFileName = 'RobotoSlab-Light.ttf';
    const expectedFontName = 'Roboto Slab';
    const expectedFontSubfamily = 'Light';
    const expectedFontWeight = '300';

    // Execute
    cy.findByText(/change font/i).click(); // Just to make sure that the user can find and then click the upload button. This command does not launch the file upload dialog box in Cypress. So we need the next command:
    cy.upload('hiddenFileInput', fontFileName); // see support/commands.js

    // verify
    cy.assertFontNameFromPreviewPageOn(
      expectedFontName,
      expectedFontSubfamily,
      expectedFontWeight,
    );
  });

  it('allows the user to change x-height, which will be shown immediately and used to calculate font-size', () => {
    // execute
    cy.findByTestId('x-height-in-pixel')
      .clear()
      .type(newUserData.xHeight);
    // verify
    cy.assertXheightFontSizeFromPreviewPageOn(
      newUserData.xHeight,
      OpenSansFontMetrics,
    );
  });

  it('allows the user to change the x-height-to-line-height ratio, which will be shown immeidately and used to calculate line-height', () => {
    // execute
    cy.findByTestId('x-height-for-ratio')
      .clear()
      .type(newUserData.xHeightRatio);
    cy.findByTestId('line-height-for-ratio')
      .clear()
      .type(newUserData.lineHeightRatio);
    // verify
    cy.assertModularScaleLineHeightFromPreviewPageOn(
      newUserData.xHeightRatio,
      newUserData.lineHeightRatio,
      userData.xHeight,
      OpenSansFontMetrics,
    );
  });

  it('alerts the user if they enter more than 4 decimal places, but the alert disappears when they correct it, for x-height', () => {
    cy.findByTestId('x-height-in-pixel').clear();
    cy.testAlertForDecimalPlaces('x-height-in-pixel');
  });
  it('alerts the user if they enter more than 4 decimal places, but the alert disappears when they correct it, for x-height ratio', () => {
    cy.findByTestId('x-height-for-ratio').clear();
    cy.testAlertForDecimalPlaces('x-height-for-ratio');
  });
  it('alerts the user if they enter more than 4 decimal places, but the alert disappears when they correct it, for line-height ratio', () => {
    cy.findByTestId('line-height-for-ratio').clear();
    cy.testAlertForDecimalPlaces('line-height-for-ratio');
  });

  it('alerts the user if they enter more than 4 decimal places, but the alert disappears when they correct it', () => {
    // setup
    const invalidUserData = {
      xHeight: 10.12345,
      xHeightRatio: 1.12345,
      lineHeightRatio: 3.12345,
    };
    // execute
    cy.findByTestId('x-height-in-pixel')
      .clear()
      .type(invalidUserData.xHeight);
    // verify
    cy.assertIfDecimalPlaceMessageTurnsRed('instruction-x-height');
    // execute
    cy.findByTestId('x-height-in-pixel').type('{backspace}'); // eliminate the 5th decimal place
    // verify
    cy.assertIfDecimalPlaceMessageTurnsNormal('instruction-x-height');

    // execute
    cy.findByTestId('x-height-for-ratio')
      .clear()
      .type(invalidUserData.xHeightRatio);
    // verify
    cy.assertIfDecimalPlaceMessageTurnsRed('instruction-modular-scale');
    // execute
    cy.findByTestId('x-height-for-ratio').type('{backspace}'); // eliminate the 5th decimal place
    // verify
    cy.assertIfDecimalPlaceMessageTurnsNormal('instruction-modular-scale');

    // execute
    cy.findByTestId('line-height-for-ratio')
      .clear()
      .type(invalidUserData.lineHeightRatio);
    // verify
    cy.assertIfDecimalPlaceMessageTurnsRed('instruction-modular-scale');
    // execute
    cy.findByTestId('line-height-for-ratio').type('{backspace}'); // eliminate the 5th decimal place
    // verify
    cy.assertIfDecimalPlaceMessageTurnsNormal('instruction-modular-scale');
  });

  it('alerts the user if they enter a value less than 1, but the alert disappears when they delete the invalid value, for x-height', () => {
    cy.findByTestId('x-height-in-pixel').clear();
    cy.testAlertForValuesLessThanOne('x-height-in-pixel');
  });
  it('alerts the user if they enter a value less than 1, but the alert disappears when they delete the invalid value, for x-height ratio', () => {
    cy.findByTestId('x-height-for-ratio').clear();
    cy.testAlertForValuesLessThanOne('x-height-for-ratio');
  });
  it('alerts the user if they enter a value less than 1, but the alert disappears when they delete the invalid value, for line-height ratio', () => {
    cy.findByTestId('line-height-for-ratio').clear();
    cy.testAlertForValuesLessThanOne('line-height-for-ratio');
  });

  it('alerts the user if they enter a value more than 100, but the alert disappears when they delete the last digit, for x-height', () => {
    cy.findByTestId('x-height-in-pixel').clear();
    cy.testAlertForValuesMoreThanHundred('x-height-in-pixel');
  });
  it('alerts the user if they enter a value more than 100, but the alert disappears when they delete the last digit, for x-height ratio', () => {
    cy.findByTestId('x-height-for-ratio').clear();
    cy.testAlertForValuesMoreThanHundred('x-height-for-ratio');
  });
  it('alerts the user if they enter a value more than 100, but the alert disappears when they delete the last digit, for line-height ratio', () => {
    cy.findByTestId('line-height-for-ratio').clear();
    cy.testAlertForValuesMoreThanHundred('line-height-for-ratio');
  });
});

describe('Preview Page after uploading a font file', () => {
  // setup
  const fontFamily = `Roboto Slab`;
  const fontWeight = `300`;
  const RobotoSlabFontMetrics = {
    unitsPerEm: 2048,
    sxHeight: 1082,
  };

  beforeEach(() => {
    const fontFileName = 'RobotoSlab-Light.ttf';
    cy.visit('/');
    cy.upload('hiddenFileInput', fontFileName); // see support/commands.js
    cy.findByLabelText(/x-height/i).type(userData.xHeight);
    cy.findByText(/scale/i).click();
    cy.findByLabelText(/x-height/i).type(userData.xHeightRatio);
    cy.findByLabelText(/line-height/i, {selector: 'input'}).type(
      userData.lineHeightRatio,
    );
    cy.findByText(/preview/i).click();
  });

  it('allows the user to change font by clicking the "change font" button', () => {
    // Setup
    const fontFileName = 'OpenSans-Regular.ttf';
    const expectedFontName = 'Open Sans';
    const expectedFontSubfamily = 'Regular';
    const expectedFontWeight = '400';

    // Execute
    cy.findByText(/change font/i).click(); // Just to make sure that the user can find and then click the upload button. This command does not launch the file upload dialog box in Cypress. So we need the next command:
    cy.upload('hiddenFileInput', fontFileName); // see support/commands.js

    // verify
    cy.assertFontNameFromPreviewPageOn(
      expectedFontName,
      expectedFontSubfamily,
      expectedFontWeight,
    );
  });

  it('allows the user to change x-height, which will be shown immediately and used to calculate font-size', () => {
    // execute
    cy.findByTestId('x-height-in-pixel')
      .clear()
      .type(newUserData.xHeight);
    // verify
    cy.assertXheightFontSizeFromPreviewPageOn(
      newUserData.xHeight,
      RobotoSlabFontMetrics,
    );
  });

  it('allows the user to change the x-height-to-line-height ratio, which will be shown immeidately and used to calculate line-height', () => {
    // execute
    cy.findByTestId('x-height-for-ratio')
      .clear()
      .type(newUserData.xHeightRatio);
    cy.findByTestId('line-height-for-ratio')
      .clear()
      .type(newUserData.lineHeightRatio);
    // verify
    cy.assertModularScaleLineHeightFromPreviewPageOn(
      newUserData.xHeightRatio,
      newUserData.lineHeightRatio,
      userData.xHeight,
      RobotoSlabFontMetrics,
    );
  });
});
