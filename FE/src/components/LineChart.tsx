import React from "react";
import { ChartData } from "chart.js";
import {
  Chart,
  registerables,
  LineElement,
  ScatterDataPoint,
  BubbleDataPoint,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PersonData, Score } from "../types";
import moment from "moment"

Chart.register(...registerables, LineElement);

interface Props {
  datas: PersonData[];
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const LineChart: React.FunctionComponent<Props> = ({ datas }) => {
  const generateChartData = (): ChartData<
    "line",
    (number | ScatterDataPoint | BubbleDataPoint | null)[],
    unknown
  > => {
    const labels: string[] = [];
    const dataSets: any[] = [];

    datas[0].scores.forEach((each: Score) => {
      return labels.push(
        moment(each.date).format('YYYY') + " Quarter " + each.quarter + " Sprint " + each.sprint
        
        
      );
    });
    datas.forEach((person) => {
      const data: any[] = [];

      person.scores.forEach((score: Score) => {
        data.push(score.point);
      });

      dataSets.push({
        label: person.name,
        data,
        backgroundColor: person.color,
        borderColor: person.color,
        borderWidth: 2,
        tension: 0.4,
      });
    });
    return {
      labels,
      datasets: dataSets,
    };
  };
  // console.log(datas);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "80%",
        flexDirection: "column",
        // margin: "auto"
      }}
    >
      <h1 style={{ paddingTop: "20px" }}>Chart</h1>
      <Line
        style={{ height: "70%", width: "90%" }}
        data={generateChartData()}
        options={options}
      />
    </div>
  );
};

export default LineChart;
