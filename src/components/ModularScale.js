import React from 'react';
import Header from './Header';
import ModularScaleBoxes from './ModularScaleBoxes';
import FontNameDisplay from './FontNameDisplay';
import XheightDisplay from './XheightDisplay';
import {Button, ButtonContainer, NoWrap} from '../theme/style';
import ChangeFontButton from './ChangeFontButton';
import {Redirect} from 'react-router-dom';

const ModularScale = props => {
  const [redirect, setRedirect] = React.useState(false);
  const handleClick = event => {
    const xHeightErrors = document.getElementById('x-height-scale').validity;
    const lineHeightErrors = document.getElementById('line-height-scale')
      .validity;
    if (xHeightErrors.valid && lineHeightErrors.valid) {
      setRedirect(true);
    } else if (!xHeightErrors.valid) {
      props.validateModularScale(xHeightErrors);
    } else {
      props.validateModularScale(lineHeightErrors);
    }
  };
  if (redirect) {
    return <Redirect push to="/preview" />;
    // The push attribute keeps the browser history, instead of overriding, so the user can click the Back button in the browser to be back to the landing page. See https://reacttraining.com/react-router/web/api/Redirect/push-bool
  }
  return (
    <>
      <Header stepNow={3} />
      <main>
        <ModularScaleBoxes
          xHeightRatio={props.xHeightRatio}
          lineHeightRatio={props.lineHeightRatio}
          modularScaleRangeError={props.modularScaleRangeError}
          modularScaleStepError={props.modularScaleStepError}
          validateModularScale={props.validateModularScale}
          handleXHeightRatio={props.handleXHeightRatio}
          handleLineHeightRatio={props.handleLineHeightRatio}
        />
        <FontNameDisplay
          fontFamily={props.fontFamily}
          fontSubfamily={props.fontSubfamily}
        />
        <XheightDisplay xHeightPx={props.xHeightPx} />
        <ButtonContainer>
          <ChangeFontButton handleFontFile={props.handleFontFile} />
          <Button onClick={handleClick}>
            <NoWrap>Preview</NoWrap>
            <NoWrap>→</NoWrap>
          </Button>
          <Button>
            Change x-height
            <NoWrap>←</NoWrap>
          </Button>
        </ButtonContainer>
      </main>
    </>
  );
};

export default ModularScale;
