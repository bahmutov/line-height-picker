import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import SampleParagraphs from './SampleParagraphs';
import FontNameDisplay from './FontNameDisplay';
import FontFileErrorMessage from './FontFileErrorMessage';
import FontFileUploader from './FontFileUploader';
import XheightBox from './XheightBox';
import ModularScaleBoxes from './ModularScaleBoxes';
import {
  Button,
  ButtonContainer,
  ExternalLink,
  Form,
  PageTitle,
  ParagraphOneRemRightAligned,
} from '../theme/style';

import store from '../helper/store';

const Preview = props => {
  React.useEffect(() => {
    store.set('preview', 'visited');
  }, []);

  const [redirect, setRedirect] = React.useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    const xHeightErrors = document.getElementById('x-height-in-pixel').validity;
    const xHeightRatioErrors = document.getElementById('x-height-for-ratio')
      .validity;
    const lineHeightRatioErrors = document.getElementById(
      'line-height-for-ratio',
    ).validity;
    if (
      xHeightErrors.valid &&
      xHeightRatioErrors.valid &&
      lineHeightRatioErrors.valid
    ) {
      setRedirect(true);
    } else if (!xHeightErrors.valid) {
      props.handleNoXHeight(xHeightErrors);
      document.getElementById('x-height-in-pixel').focus();
    } else if (!xHeightRatioErrors.valid) {
      props.handleNoModularScale(xHeightRatioErrors);
      document.getElementById('x-height-for-ratio').focus();
    } else {
      props.handleNoModularScale(lineHeightRatioErrors);
      document.getElementById('line-height-for-ratio').focus();
    }
  };
  if (redirect) {
    return <Redirect push to="/css" />;
    // The push attribute keeps the browser history, instead of overriding, so the user can click the Back button in the browser to be back to the landing page. See https://reacttraining.com/react-router/web/api/Redirect/push-bool
  }
  return (
    <>
      <main>
        <PageTitle>Preview sample paragraphs</PageTitle>
        <SampleParagraphs
          fontFamily={props.fontFamily}
          fontSize={props.fontSize}
          fontWeight={props.fontWeight}
          lineHeight={props.lineHeight}
          marginTop={props.marginTop}
        />
        <ParagraphOneRemRightAligned>
          An excerpt from{' '}
          <ExternalLink href="https://news.stanford.edu/2005/06/14/jobs-061505/">
            Steve Jobs’s Stanford University Commencement address in 2005
          </ExternalLink>
        </ParagraphOneRemRightAligned>
        <Form noValidate onSubmit={handleSubmit}>
          <ButtonContainer>
            <Button type="submit">Get CSS code</Button>
          </ButtonContainer>
          <FontNameDisplay
            fontFamily={props.fontFamily}
            fontSubfamily={props.fontSubfamily}
          />
          <FontFileUploader
            handleFontFile={props.handleFontFile}
            validateFileType={props.validateFileType}
          >
            Open different font file…
          </FontFileUploader>
          <FontFileErrorMessage
            data-testid="error-message-font-file"
            fontFileError={props.fontFileError}
          />
          <XheightBox
            handleXHeightChange={props.handleXHeightChange}
            xHeightPx={props.xHeightPx}
            validateXHeight={props.validateXHeight}
            xHeightRangeError={props.xHeightRangeError}
            xHeightStepError={props.xHeightStepError}
          />
          <ModularScaleBoxes
            xHeightRatio={props.xHeightRatio}
            handleXHeightRatioChange={props.handleXHeightRatioChange}
            lineHeightRatio={props.lineHeightRatio}
            handleLineHeightRatioChange={props.handleLineHeightRatioChange}
            validateModularScale={props.validateModularScale}
            modularScaleRangeError={props.modularScaleRangeError}
            modularScaleStepError={props.modularScaleStepError}
          />
        </Form>
      </main>
    </>
  );
};

Preview.propTypes = {
  fontFamily: PropTypes.string,
  fontFileError: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  fontSubfamily: PropTypes.string,
  fontWeight: PropTypes.string,
  handleFontFile: PropTypes.func.isRequired,
  handleLineHeightRatioChange: PropTypes.func.isRequired,
  handleNoModularScale: PropTypes.func.isRequired,
  handleNoXHeight: PropTypes.func.isRequired,
  handleXHeightChange: PropTypes.func.isRequired,
  handleXHeightRatioChange: PropTypes.func.isRequired,
  lineHeight: PropTypes.string,
  lineHeightRatio: PropTypes.string,
  marginTop: PropTypes.string,
  modularScaleRangeError: PropTypes.string,
  modularScaleStepError: PropTypes.string,
  xHeightPx: PropTypes.string,
  xHeightRangeError: PropTypes.string,
  xHeightRatio: PropTypes.string,
  xHeightStepError: PropTypes.string,
  validateFileType: PropTypes.func.isRequired,
  validateModularScale: PropTypes.func.isRequired,
  validateXHeight: PropTypes.func.isRequired,
};

export default Preview;
