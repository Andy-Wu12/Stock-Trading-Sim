import { Chart } from "react-google-charts";

// Data reference:
  // https://developers.google.com/chart/interactive/docs/gallery/candlestickchart#data-format

// export const data = [
//   ["Day", "", "", "", ""],
//   ["Mon", 20, 28, 38, 45],
//   ["Tue", 31, 38, 55, 66],
//   ["Wed", 50, 55, 77, 80],
//   ["Thu", 77, 77, 66, 50],
//   ["Fri", 68, 66, 22, 15],
// ];

// export const options = {
//   legend: "none",
//   bar: { groupWidth: "100%" }, // Remove space between bars.
//   candlestick: {
//     fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
//     risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
//   },
// };

export interface GoogleChartProps {
  data: any
  options: any
}

export function CandleStick({data, options}: GoogleChartProps): React.ReactElement {
  return (
    <Chart
      chartType="CandlestickChart"
      data={data}
      options={options}
    />
  );
}

export function ColumnGraph({data, options}: GoogleChartProps): React.ReactElement {
  return (
    <Chart
      chartType="ColumnChart"
      data={data}
      options={options}
    />
  )
}

const Charts = {CandleStick, ColumnGraph};

export default Charts;