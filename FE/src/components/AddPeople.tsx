import React from "react";
import { PersonData } from "../types";
import axios from "axios";

interface Props {
  datas: PersonData[];
  onFinish: (newDatas: PersonData[]) => void;
}

const AddPeople: React.FunctionComponent<Props> = ({ datas, onFinish }) => {
  // const newPersonScore: Score[] = [];

  // datas[0].scores.forEach((score) => {
  //   newPersonScore.push({
  //     sprint: score.sprint,
  //     quarter: score.quarter,
  //     date: score.date,
  //     point: 0,
  //   });
  // });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/demo/create", {
        name: e.target.name.value,
        color: e.target.color.value,
        description: e.target.description.value,
        scores: [],
      })
      .then((response: any) => {
        if (response.status === 200) {
          window.location.reload();
        }
      });
  };

  return (
    <>
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          boxShadow: "1px 1px gray",
          padding: "20px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Add people</h1>
        <form
          onSubmit={handleSubmit}
          action="submit"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            style={{ height: "20px", margin: "10px" }}
          />
          <select
            name="color"
            defaultValue="color"
            style={{ width: "180px", height: "20px", margin: "10px" }}
          >
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="green">yellow</option>
            <option value="green">purple</option>
            <option value="green">black</option>
          </select>
          <select
            name="description"
            defaultValue="description"
            style={{ width: "180px", height: "20px", margin: "10px" }}
          >
            <option value="full">full</option>
            <option value="half">half</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddPeople;

// newPersonScore[newPersonScore.length - 1].point = e.target.point.value;

// const id = e.target.id.value;
// const sprint = e.target.sprint.value;
// const currentPerson = datas?.find((data) => {
//   return data.id.toString() === id;
// });

// if (currentPerson != null) {
//   const lastSprintResult =
//     currentPerson.scores[currentPerson.scores.length - 1];

//   currentPerson.scores.push({
//     sprint: lastSprintResult.sprint + 1,
//     quarter: lastSprintResult.quarter + 1,
//     date: lastSprintResult.date,
//     point: e.target.point.value,
//   });
//   datas.map((data) =>
//     data.id === id
//       ? {
//           ...data,
//           scores: currentPerson.scores,
//         }
//       : data
//   );
//   onFinish([...datas]);
// } else {
//   onFinish([
//     ...datas,
//     {
//       id: e.target.id.value,
//       name: e.target.name.value,
//       color: e.target.color.value,
//       desc: e.target.description.value,
//       scores: newPersonScore,
//     },
//   ]);
// }
