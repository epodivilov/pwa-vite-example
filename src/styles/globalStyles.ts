import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
    /* Add padding for iOS safe areas */
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    overscroll-behavior: none;
  }

  @media (prefers-color-scheme: dark) {
    html,
    body {
      background-color: #1b1b1b;
      color: #f6f6f7;
    }
  }

  @media (prefers-color-scheme: light) {
    html,
    body {
      background-color: #f3eff6;
      color: #303032;
    }
  }
`;
