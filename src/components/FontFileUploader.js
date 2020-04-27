import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router';
import {Button} from '../theme/style';
import {fontFileExtensionsArray as acceptableFileExtensions} from '../helper/fontFileExtensions';

const FontFileUploader = props => {
  const [redirect, setRedirect] = React.useState(false);

  const handleClick = event => {
    document.getElementById('hiddenFileInput').click();
  };

  const handleChange = async event => {
    const fileUploaded = event.target.files[0];
    const fileIsValid = props.validateFileType(fileUploaded);
    if (fileIsValid) {
      try {
        await props.handleFontFile(fileUploaded);
        // Only if the user is on landing page, redirect to the x-height page
        if (props.home) {
          setRedirect(true);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(
        'The file you have selected has an extension other than otf, ttf, or woff.',
      );
    }
  };
  if (redirect) {
    return <Redirect push to="/x-height" />;
    // The push attribute keeps the browser history, instead of overriding, so the user can click the Back button in the browser to be back to the landing page. See https://reacttraining.com/react-router/web/api/Redirect/push-bool
  }
  return (
    <>
      <Button data-testid="font-button" type="button" onClick={handleClick}>
        {props.children}
      </Button>
      <input
        type="file"
        data-testid="hiddenFileInput"
        id="hiddenFileInput"
        accept={acceptableFileExtensions.join()}
        onChange={handleChange}
        style={{display: 'none'}}
        aria-describedby="whatHappened-fontFile howToResolve-fontFile extraText-fontFile"
      />
    </>
  );
  // See the section "Using hidden file input elements using the click() method” in https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
};

FontFileUploader.propTypes = {
  home: PropTypes.bool,
  validateFileType: PropTypes.func.isRequired,
  handleFontFile: PropTypes.func.isRequired,
};

export default FontFileUploader;
