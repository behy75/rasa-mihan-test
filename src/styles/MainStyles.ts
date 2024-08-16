/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const mainBackgroundColor = "#20232a"
const mainTextColor = "#61dafb"

export const MainContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: ${mainBackgroundColor};
  text-align: center;
  color: ${mainTextColor}; 
`;