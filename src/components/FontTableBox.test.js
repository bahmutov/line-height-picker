import React from 'react';
import render from './test-utils/render';
import {cleanup} from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import FontTableBox from './FontTableBox';

const mockUpdateFontMetrics = jest.fn();

const userInput = {
  preferredFamily: 'Roboto Slab',
  preferredSubfamily: 'Light',
  sCapHeight: '1456',
  sxHeight: '1082',
  unitsPerEm: '2048',
  usWeightClass: '300',
};

afterEach(() => {
  jest.clearAllMocks();
});

test('renders correctly', () => {
  const {container} = render(
    <FontTableBox updateFontMetrics={mockUpdateFontMetrics} />,
  );
  expect(container).toMatchInlineSnapshot(`
    .c6 {
      font-weight: inherit;
    }

    .c1 {
      color: currentColor;
      font-size: 1rem;
    }

    .c4 {
      color: currentColor;
      font-size: 1rem;
      visibility: hidden;
    }

    .c2 {
      font-family: monospace;
      font-size: 1rem;
    }

    .c7 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: inherit;
      border: 2px solid currentColor;
      border-radius: 4px;
      color: inherit;
      cursor: pointer;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      font-size: 5vw;
      font-weight: bold;
      max-width: 315px;
      padding: 5.625% 11.25%;
      -webkit-text-decoration: none;
      text-decoration: none;
      text-transform: uppercase;
      width: 45%;
    }

    .c0 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      font-size: 3rem;
      font-weight: 200;
      padding: 0 0 3rem 0;
    }

    .c3 {
      background-color: hsl(0,0%,25%);
      border: none;
      border-bottom: 2px solid hsl(0,0%,96%);
      border-radius: 4px 4px 0 0;
      color: hsl(0,0%,96%);
      font-weight: 200;
      font-size: 9rem;
      text-align: center;
    }

    .c3:active,
    .c3:hover,
    .c3:focus {
      background-color: hsl(0,0%,35%);
      outline: none;
    }

    .c5 {
      background-color: hsl(0,0%,25%);
      border: none;
      border-bottom: 2px solid hsl(0,0%,96%);
      border-radius: 4px 4px 0 0;
      color: hsl(0,0%,96%);
      font-weight: 200;
      font-size: 9rem;
      text-align: center;
      -moz-appearance: textfield;
      -webkit-appearance: textfield;
      -webkit-appearance: textfield;
      -moz-appearance: textfield;
      appearance: textfield;
    }

    .c5:active,
    .c5:hover,
    .c5:focus {
      background-color: hsl(0,0%,35%);
      outline: none;
    }

    .c5::-webkit-inner-spin-button,
    .c5::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    @media (min-width:875px) {
      .c7 {
        font-size: 43.75px;
      }
    }

    <div>
      <form
        class="c0"
        novalidate=""
      >
        <p
          class="c1"
        >
          Or enter font table values:
        </p>
        <label
          class=""
          for="preferredFamily"
        >
          preferredFamily
        </label>
        <p
          class="c1"
          id="instruction-preferredFamily"
        >
          Font family name to be used for the
          <code
            class="c2"
          >
            font-family
          </code>
           CSS property. It can be found in the
          <code
            class="c2"
          >
            name
          </code>
           table. If it doesn't exist, enter the
          <code
            class="c2"
          >
            fontFamily
          </code>
           value.
        </p>
        <input
          aria-describedby="instruction-preferredFamily error-message-preferredFamily"
          class="c3"
          data-testid="preferredFamily"
          id="preferredFamily"
          name="preferredFamily"
          placeholder="Open Sans"
          required=""
          type="text"
        />
        <p
          class="c4"
          data-testid="error-message-preferredFamily"
          id="error-message-preferredFamily"
        >
          Enter the font family name.
        </p>
        <label
          class=""
          for="preferredSubfamily"
        >
          preferredSubfamily
        </label>
        <p
          class="c1"
          id="instruction-preferredSubfamily"
        >
          Font subfamily name (e.g. Light, Regular, Bold). It can be found in the
          <code
            class="c2"
          >
            name
          </code>
           table. If it doesn't exist, enter the

          <code
            class="c2"
          >
            fontSubfamily
          </code>
           value.
        </p>
        <input
          aria-describedby="instruction-preferredSubfamily error-message-preferredSubfamily"
          class="c3"
          data-testid="preferredSubfamily"
          id="preferredSubfamily"
          name="preferredSubfamily"
          placeholder="Regular"
          required=""
          type="text"
        />
        <p
          class="c4"
          data-testid="error-message-preferredSubfamily"
          id="error-message-preferredSubfamily"
        >
          Enter the font subfamily name (such as Regular, Italic, Bold, Light).
        </p>
        <label
          class=""
          for="usWeightClass"
        >
          usWeightClass
        </label>
        <p
          class="c1"
          id="instruction-usWeightClass"
        >
          Number to be used for the
          <code
            class="c2"
          >
            font-weight
          </code>
           CSS property. It can be found in the
          <code
            class="c2"
          >
            OS/2
          </code>
           table.
        </p>
        <input
          aria-describedby="instruction--usWeightClass error-message-usWeightClass"
          class="c5"
          data-testid="usWeightClass"
          id="usWeightClass"
          max="1000"
          min="1"
          name="usWeightClass"
          pattern="[0-9]*[.,]?[0-9]+"
          placeholder="400"
          required=""
          step="1"
          type="number"
        />
        <p
          class="c4"
          data-testid="error-message-usWeightClass"
          id="error-message-usWeightClass"
        >
          Please enter a

          <b
            class="c6"
            data-testid="bring-attention-usWeightClass"
          >
            whole number
          </b>

          between 1 and 1000.
        </p>
        <label
          class=""
          for="unitsPerEm"
        >
          unitsPerEm
        </label>
        <p
          class="c1"
          id="instruction-unitsPerEm"
        >
          Number of units for the length set by the
          <code
            class="c2"
          >
            font-size
          </code>
           CSS property. It can be found in the
          <code
            class="c2"
          >
            head
          </code>
           table. Usually, either 1000, 1024 or 2048.
        </p>
        <input
          aria-describedby="instruction-unitsPerEm error-message-unitsPerEm"
          class="c5"
          data-testid="unitsPerEm"
          id="unitsPerEm"
          max="16384"
          min="16"
          name="unitsPerEm"
          pattern="[0-9]*[.,]?[0-9]+"
          placeholder="2048"
          required=""
          step="1"
          type="number"
        />
        <p
          class="c4"
          data-testid="error-message-unitsPerEm"
          id="error-message-unitsPerEm"
        >
          Please enter a

          <b
            class="c6"
            data-testid="bring-attention-unitsPerEm"
          >
            whole number
          </b>

          between 16 and 16384.
        </p>
        <label
          class=""
          for="sxHeight"
        >
          sxHeight
        </label>
        <p
          class="c1"
          id="instruction-sxHeight"
        >
          Number of units for x-height (the height of lowercase x). It can be found in the
          <code
            class="c2"
          >
            OS/2
          </code>
           table.
        </p>
        <input
          aria-describedby="instruction-sxHeight error-message-sxHeight"
          class="c5"
          data-testid="sxHeight"
          id="sxHeight"
          max="16384"
          min="16"
          name="sxHeight"
          pattern="[0-9]*[.,]?[0-9]+"
          placeholder="1096"
          required=""
          step="1"
          type="number"
        />
        <p
          class="c4"
          data-testid="error-message-sxHeight"
          id="error-message-sxHeight"
        >
          Please enter a

          <b
            class="c6"
            data-testid="bring-attention-sxHeight"
          >
            whole number
          </b>

          between 16 and 16384.
        </p>
        <label
          class=""
          for="sCapHeight"
        >
          sCapHeight
        </label>
        <p
          class="c1"
          id="instruction-sCapHeight"
        >
          Number of units for cap-height (the height of uppercase H). It can be found in the
          <code
            class="c2"
          >
            OS/2
          </code>
           table.
        </p>
        <input
          aria-describedby="instruction-sCapHeight error-message-sCapHeight"
          class="c5"
          data-testid="sCapHeight"
          id="sCapHeight"
          max="16384"
          min="16"
          name="sCapHeight"
          pattern="[0-9]*[.,]?[0-9]+"
          placeholder="1462"
          required=""
          step="1"
          type="number"
        />
        <p
          class="c4"
          data-testid="error-message-sCapHeight"
          id="error-message-sCapHeight"
        >
          Please enter a

          <b
            class="c6"
            data-testid="bring-attention-sCapHeight"
          >
            whole number
          </b>

          between 16 and 16384.
        </p>
        <button
          class="c7"
          type="submit"
        >
          Next
        </button>
      </form>
    </div>
  `);
});

test('calls the updateFontMetrics function after clicking the next buton with all font metric values supplied', () => {
  const {getByLabelText, getByText} = render(
    <FontTableBox updateFontMetrics={mockUpdateFontMetrics} />,
  );
  user.type(getByLabelText('sxHeight'), userInput.sxHeight);
  user.type(getByLabelText('sCapHeight'), userInput.sCapHeight);
  user.type(getByLabelText('unitsPerEm'), userInput.unitsPerEm);
  user.type(getByLabelText('preferredFamily'), userInput.preferredFamily);
  user.type(getByLabelText('preferredSubfamily'), userInput.preferredSubfamily);
  user.type(getByLabelText('usWeightClass'), userInput.usWeightClass);
  user.click(getByText(/next/i));
  expect(mockUpdateFontMetrics).toHaveBeenCalledTimes(1); // this assertion fails because userInput numerical values return stepMismatch errors for some reason...
  expect(mockUpdateFontMetrics).toHaveBeenCalledWith(userInput);
});

test('is accessible', async () => {
  const {container} = render(
    <FontTableBox updateFontMetrics={mockUpdateFontMetrics} />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
