/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const baseFontSize = '14px';
const baseColor = '#e1e3e4';
const borderColor = '#333';
const hoverColor = 'rgba(255, 255, 255, 0.1)';
const listsBackgroundColor = "#131722"
const lablesTextColor = "#8e8e8e"
const redColor = '#f44336'
const greenColor = '#4caf50'

export const containerStyle = css`
  background-color: ${listsBackgroundColor};
  border-radius: 10px;
  width: 90%; 
  max-width: 400px;
  padding: 15px;
  font-family: Arial, sans-serif;
  color: ${baseColor};
  height: 80vh;
  overflow-y: scroll;
`;

export const dataItemStyle = css`
  padding: 10px 5px;
  border-bottom: 1px solid ${borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${hoverColor};
  }
`;

export const titleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const symbolStyle = css`
  font-weight: 500;
  font-size: ${baseFontSize};
`;

export const labelStyle = css`
  font-size: 12px;
  color: ${lablesTextColor};
  padding-top: 3px;
`;

export const priceContainerStyle = css`
  text-align: right;
`;

export const priceStyle = css`
  font-size: 16px;
  font-weight: bold;
`;

export const percentageChangeStyle = (positive: boolean) => css`
  font-size: 12px;
  color: ${positive ? greenColor : redColor};
  padding-top: 3px;
`;

export const loaderStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${baseColor};
  font-size: 18px;
`;
