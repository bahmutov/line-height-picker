import React from 'react';
import PropTypes from 'prop-types';

import FontFileErrorMessage from './FontFileErrorMessage';
import FontFileUploader from './FontFileUploader';
import FontNameDisplay from './FontNameDisplay';

import {
  LinearLight,
  Section,
  SectionTitle,
  SpacerVertical,
} from '../theme/style';

const SectionFont = props => {
  return (
    <Section>
      <SpacerVertical height="3" />
      <SectionTitle>Font chosen:</SectionTitle>
      <SpacerVertical height="2" />
      <LinearLight />
      <FontNameDisplay
        ascender={props.ascender}
        capHeight={props.capHeight}
        descender={props.descender}
        fontFamily={props.fontFamily}
        fontSubfamily={props.fontSubfamily}
        fontWeight={props.fontWeight}
        unitsPerEm={props.unitsPerEm}
      />
      <LinearLight />
      <SpacerVertical height="2" />
      <FontFileUploader
        handleFontFile={props.handleFontFile}
        validateFileType={props.validateFileType}
      >
        Change font…
      </FontFileUploader>
      <FontFileErrorMessage
        data-testid="error-message-font-file"
        fontFileError={props.fontFileError}
      />
      <SpacerVertical height="3" />
    </Section>
  );
};

SectionFont.propTypes = {
  ascender: PropTypes.number,
  capHeight: PropTypes.number,
  descender: PropTypes.number,
  fontFamily: PropTypes.string,
  fontFileError: PropTypes.string.isRequired,
  fontSubfamily: PropTypes.string,
  fontWeight: PropTypes.string,
  handleFontFile: PropTypes.func.isRequired,
  unitsPerEm: PropTypes.number,
  validateFileType: PropTypes.func.isRequired,
};

export default SectionFont;
