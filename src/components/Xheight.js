import React from 'react';
import PropTypes from 'prop-types';

import XheightBox from './XheightBox';
import SectionFont from './SectionFont';
import XheightGuide from './XheightGuide';
import {
  ButtonWithRightArrow,
  Form,
  Section,
  SectionTitle,
  Spacer,
} from '../theme/style';
import {useHistory} from 'react-router-dom';

import store from '../helper/store';

const Xheight = props => {
  React.useEffect(() => {
    store.set('x-height', 'visited');
  }, []);

  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    const xHeightInputField = document.getElementById('x-height-in-pixel'); // useRef(null) or createRef() doesn't work for some reason
    const errors = xHeightInputField.validity;
    if (errors.valid) {
      history.push({
        pathname: '/modular-scale',
        state: {transition: 'slideleft', duration: 300},
      });
    } else {
      props.handleNoXHeight(errors);
      xHeightInputField.focus();
      props.disableButton();
    }
  };

  return (
    <>
      <main>
        <Section>
          <Spacer height="3" />
          <SectionTitle>Setting text size</SectionTitle>
          <Spacer height="2" />
          <Form noValidate onSubmit={handleSubmit}>
            <XheightBox
              handleXHeightChange={props.handleXHeightChange}
              validateXHeight={props.validateXHeight}
              xHeightPx={props.xHeightPx}
              xHeightRangeError={props.xHeightRangeError}
              xHeightStepError={props.xHeightStepError}
            />{' '}
            <Spacer height="2" />
            <ButtonWithRightArrow
              type="submit"
              primary
              disabled={props.buttonDisabled}
            >
              Next
            </ButtonWithRightArrow>
            <Spacer height="3" />
          </Form>
        </Section>
        <SectionFont
          ascender={props.ascender}
          capHeight={props.capHeight}
          descender={props.descender}
          fontFamily={props.fontFamily}
          fontFileError={props.fontFileError}
          fontSubfamily={props.fontSubfamily}
          fontWeight={props.fontWeight}
          handleFontFile={props.handleFontFile}
          unitsPerEm={props.unitsPerEm}
          validateFileType={props.validateFileType}
        />
        <Spacer height="3" />
        <XheightGuide />
        <Spacer height="3" />
      </main>
    </>
  );
};

Xheight.propTypes = {
  ascender: PropTypes.number,
  buttonDisabled: PropTypes.bool,
  capHeight: PropTypes.number,
  descender: PropTypes.number,
  disableButton: PropTypes.func.isRequired,
  fontFamily: PropTypes.string,
  fontFileError: PropTypes.string.isRequired,
  fontSubfamily: PropTypes.string,
  fontWeight: PropTypes.string,
  handleFontFile: PropTypes.func.isRequired,
  handleNoXHeight: PropTypes.func.isRequired,
  handleXHeightChange: PropTypes.func.isRequired,
  validateFileType: PropTypes.func.isRequired,
  validateXHeight: PropTypes.func.isRequired,
  unitsPerEm: PropTypes.number,
  xHeightPx: PropTypes.string,
  xHeightRangeError: PropTypes.string.isRequired,
  xHeightStepError: PropTypes.string.isRequired,
};

export default Xheight;
