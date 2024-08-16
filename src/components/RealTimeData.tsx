/** @jsxImportSource @emotion/react */
import {
  containerStyle,
  dataItemStyle,
  titleStyle,
  symbolStyle,
  labelStyle,
  priceContainerStyle,
  priceStyle,
  percentageChangeStyle,
  loaderStyle,
} from "../styles/RealTimeDataStyles";
import useWebSocketData from "../hooks/useWebSocketData";

const RealTimeData: React.FC = () => {
  const { data, loading } = useWebSocketData("wss://fstream.binance.com/ws", [
    "!ticker@arr",
  ]);

  return (
    <div css={containerStyle}>
      {loading ? (
        <div css={loaderStyle}>Loading...</div>
      ) : (
        data.map((item) => (
          <div key={item.s} css={dataItemStyle}>
            <div css={titleStyle}>
              <div css={symbolStyle}>{item.s}</div>
              <div css={labelStyle}>Perpetual</div>
            </div>
            <div css={priceContainerStyle}>
              <div css={priceStyle}>{item.c}</div>
              <div css={percentageChangeStyle(parseFloat(item.p) > 0)}>
                {parseFloat(item.p) > 0 ? "+" : ""}
                {item.p}%
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RealTimeData;
