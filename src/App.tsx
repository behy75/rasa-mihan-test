import React from "react";
import RealTimeData from "./components/RealTimeData";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: #20232a;
  text-align: center;
  color: #61dafb;
`;

const App: React.FC = () => {
  return (
    <Container>
      <h1>Live Market Data</h1>
      <RealTimeData />
    </Container>
  );
};

export default App;
