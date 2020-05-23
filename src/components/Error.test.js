import React from 'react';
import render from './test-utils/render';
import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import Error from './Error';

test('renders correctly', () => {
  const {container} = render(<Error />);
  expect(container).toMatchInlineSnapshot(`
    .c5 {
      background: hsl(0,0%,46%);
      background: linear-gradient( to bottom, transparent 50%, hsl(0,0%,96%) 50%, hsl(0,0%,96%) );
      background-position: 0 calc( 0.125em + 0.708em );
      background-repeat: no-repeat;
      background-size: 100% 1px;
      color: hsl(0,0%,96%);
      cursor: pointer;
      -webkit-text-decoration: none;
      text-decoration: none;
      text-shadow: 0.03em 0 hsl(0,0%,25%), -0.03em 0 hsl(0,0%,25%),0 0.03em hsl(0,0%,25%), 0 -0.03em hsl(0,0%,25%);
    }

    .c5:visited {
      background: hsl(0,0%,36%);
      background: linear-gradient( to bottom, transparent 50%, hsl(0,0%,76%) 50%, hsl(0,0%,76%) );
      color: hsl(0,0%,76%);
    }

    .c5:focus,
    .c5:hover {
      background: hsl(0,0%,46%);
      display: inline-block;
      outline: none;
      text-shadow: none;
    }

    .c5:active {
      background: none;
    }

    .c5:visited:focus,
    .c5:visited:hover {
      background: hsl(0,0%,36%);
      display: inline-block;
      outline: none;
      text-shadow: none;
    }

    .c5:visited:active {
      background: none;
    }

    .c1 {
      height: 1.8080357142857142rem;
      width: auto;
    }

    .c3 {
      height: 1.2053571428571428rem;
      width: auto;
    }

    .c0 {
      max-width: 700px;
      padding-left: 12.857142857142858px;
      padding-right: 12.857142857142858px;
    }

    .c2 {
      font-size: 1.47174375rem;
      font-weight: 300;
      line-height: 1;
    }

    .c2::before,
    .c2::after {
      content: '';
      display: block;
      height: 0;
      width: 0;
    }

    .c2::before {
      margin-bottom: -0.10596546310832025rem;
    }

    .c2::after {
      margin-top: -0.32378335949764525rem;
    }

    .c4 {
      color: currentColor;
      font-weight: inherit;
      font-variant-numeric: oldstyle-nums;
      font-feature-settings: 'calt','clig','kern','liga','onum';
    }

    .c4::before,
    .c4::after {
      content: '';
      display: block;
      height: 0;
      width: 0;
    }

    .c4::before {
      margin-bottom: -0.2497057983222135rem;
    }

    .c4::after {
      margin-top: -0.39491772924843016rem;
    }

    @media (min-width:875px) {
      .c0 {
        margin: 0 auto;
      }
    }

    @media only screen and (min-width:1024px) {
      .c2 {
        font-size: 1.71703125rem;
      }
    }

    @media only screen and (min-width:1024px) {
      .c2::before {
        margin-bottom: -0.12362637362637363rem;
      }
    }

    @media only screen and (min-width:1024px) {
      .c2::after {
        margin-top: -0.37774725274725274rem;
      }
    }

    @media only screen and (min-width:1024px) {
      .c4::before {
        margin-bottom: -0.29132305116758245rem;
      }
    }

    @media only screen and (min-width:1024px) {
      .c4::after {
        margin-top: -0.46073697058150187rem;
      }
    }

    <div>
      <main>
        <section
          class="c0"
        >
          <div
            class="c1"
            height="3"
          />
          <h2
            class="c2"
          >
            404
          </h2>
          <div
            class="c3"
            height="2"
          />
          <p
            class="c4"
          >
            We can't find the page you're looking for.
             
            <a
              class="c5"
              href="/"
            >
              Click here
            </a>
             to visit our web app's landing page.
          </p>
          <div
            class="c1"
            height="3"
          />
           
        </section>
      </main>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<Error />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
