import React from 'react';
import PropTypes from 'prop-types';

import XheightBox from './XheightBox';
import FontNameDisplay from './FontNameDisplay';
import FontFileErrorMessage from './FontFileErrorMessage';
import {Button, ButtonContainer, Form, NoWrap} from '../theme/style';
import FontFileUploader from './FontFileUploader';
import {Redirect} from 'react-router-dom';

const Xheight = props => {
  React.useEffect(() => {
    sessionStorage.setItem('x-height', 'visited');
  }, []);

  const [redirect, setRedirect] = React.useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    const xHeightInputField = document.getElementById('x-height-in-pixel');
    const errors = xHeightInputField.validity;
    if (errors.valid) {
      setRedirect(true);
    } else {
      props.handleNoXHeight(errors);
      // Focus on the first invalid input element
      xHeightInputField.focus();
    }
  };
  if (redirect) {
    return <Redirect push to="/modular-scale" />;
    // The push attribute keeps the browser history, instead of overriding, so the user can click the Back button in the browser to be back to the landing page. See https://reacttraining.com/react-router/web/api/Redirect/push-bool
  }
  return (
    <>
      <main>
        <Form noValidate onSubmit={handleSubmit}>
          <XheightBox
            handleXHeightChange={props.handleXHeightChange}
            validateXHeight={props.validateXHeight}
            xHeightPx={props.xHeightPx}
            xHeightRangeError={props.xHeightRangeError}
            xHeightStepError={props.xHeightStepError}
          />{' '}
          <Button type="submit">
            <NoWrap>Pick</NoWrap>
            <NoWrap>Modular</NoWrap>
            <NoWrap>Scale</NoWrap>
            <NoWrap>→</NoWrap>
          </Button>
        </Form>
        <FontNameDisplay
          fontFamily={props.fontFamily}
          fontSubfamily={props.fontSubfamily}
        />
        <ButtonContainer>
          <FontFileUploader
            handleFontFile={props.handleFontFile}
            validateFileType={props.validateFileType}
          >
            Change font
          </FontFileUploader>
          <FontFileErrorMessage
            data-testid="error-message-font-file"
            fontFileError={props.fontFileError}
          />
        </ButtonContainer>
      </main>
    </>
  );
};

Xheight.propTypes = {
  fontFamily: PropTypes.string,
  fontFileError: PropTypes.string.isRequired,
  fontSubfamily: PropTypes.string,
  handleFontFile: PropTypes.func.isRequired,
  handleNoXHeight: PropTypes.func.isRequired,
  handleXHeightChange: PropTypes.func.isRequired,
  validateFileType: PropTypes.func.isRequired,
  validateXHeight: PropTypes.func.isRequired,
  xHeightPx: PropTypes.string,
  xHeightRangeError: PropTypes.string.isRequired,
  xHeightStepError: PropTypes.string.isRequired,
};

export default Xheight;
