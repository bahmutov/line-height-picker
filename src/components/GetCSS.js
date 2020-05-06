import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {
  AlertMessage,
  Button,
  ButtonWithLeftArrow,
  Code,
  CodeSnippet,
  SectionTitle,
  SectionTitleWrapper,
  Section,
} from '../theme/style';
import {clipboardError} from '../helper/errorMessages';

import store from '../helper/store';

const GetCSS = props => {
  React.useEffect(() => {
    store.set('css', 'visited');
  }, []);

  // Create CSS code
  let fontFamilyName = props.fontFamily;
  if (/\s/.test(fontFamilyName)) {
    fontFamilyName = `'${fontFamilyName}'`;
  }
  const cssOutput = `p {
  font-family: ${fontFamilyName};
  font-size: ${props.fontSize}px;
  font-weight: ${props.fontWeight};
  line-height: ${props.lineHeight};
}

p + p {
  margin-top: ${props.marginTop}px;
}`;

  // Copy button text
  const copyButtonText = {
    default: 'Copy CSS code',
    afterClick: 'Copied!',
  };
  const [buttonText, setButtonText] = React.useState(copyButtonText.default);

  // Handling copy to clipboard
  const [error, setError] = React.useState(false);
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      // For browsers supporting Clipboard API
      navigator.clipboard.writeText(cssOutput);
    } else {
      if (document.queryCommandSupported('copy')) {
        // For browsers not supporting Clipboard API
        const cssCode = document.getElementById('cssCode');
        const range = document.createRange();
        range.selectNode(cssCode);
        window.getSelection().addRange(range);
        try {
          const success = document.execCommand('copy');
          const message = success ? 'successful' : 'unsuccessful';
          console.log(`Copying was ${message}`);
        } catch (err) {
          console.log('unable to copy');
          setError(true);
          return;
        }
        window.getSelection().removeAllRanges();
      } else {
        console.log('unable to copy');
        setError(true);
        return;
      }
    }
    setButtonText(copyButtonText.afterClick);
    setTimeout(() => {
      setButtonText(copyButtonText.default);
    }, 1500);
  };

  return (
    <>
      <main>
        <Section>
          <SectionTitleWrapper>
            <SectionTitle>Get CSS</SectionTitle>
          </SectionTitleWrapper>
          <CodeSnippet>
            <Code data-testid="cssCode" id="cssCode">
              {cssOutput}
            </Code>
          </CodeSnippet>
          <Button
            data-testid="copy-button"
            disabled={error}
            onClick={copyToClipboard}
            aria-describedby="whatHappened howToResolve extraText"
          >
            {buttonText}
          </Button>
        </Section>
        <ButtonWithLeftArrow as={Link} to="/preview">
          Back
        </ButtonWithLeftArrow>
        <Section>
          <AlertMessage
            id="whatHappened"
            data-testid="whatHappened"
            error={error}
            errorText
          >
            {clipboardError.whatHappened}
          </AlertMessage>
          <AlertMessage
            id="howToResolve"
            data-testid="howToResolve"
            error={error}
            errorText
          >
            {clipboardError.howToResolve}
          </AlertMessage>
          <AlertMessage
            id="extraText"
            data-testid="extraText"
            error={error}
            errorText
          >
            {clipboardError.extraText}
          </AlertMessage>
        </Section>
      </main>
    </>
  );
};

GetCSS.propTypes = {
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.string,
  marginTop: PropTypes.string,
};

export default GetCSS;
