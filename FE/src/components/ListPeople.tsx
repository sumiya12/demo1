import React, { useState } from "react";
import { PersonData, Score } from "../types";
import axios from "axios";
interface Props {
  datas: PersonData[];
  onFinish: () => void;
}
interface Person extends PersonData {
  eachPerson: Person;
}

const ListPeople: React.FunctionComponent<Props> = ({ datas, onFinish }) => {
  const [data, setData] = useState<Score[]>();
  const [id, setId] = useState();
  const [eachPerson, setEachPerson] = useState<Person>();

  const handleclick = async (id: any) => {
    try {
      await axios
        .get(`http://localhost:3001/demo/getbyid/${id}`)
        .then((response: any) => {
          if (response.status === 200) {
            setEachPerson(response.data.data);
            setData(response.data.data.scores);
          }
        });
    } catch (error) {}
  };

  const handlesubmit = async (e: any) => {
    e.preventDefault();

    console.log(id);

    try {
      await axios
        .post(`http://localhost:3001/demo/createbyid/${id ? id : ""}`, {
          point: e.target.point.value,
          date: e.target.date.value,
          quarter: e.target.quarter.value,
          sprint: e.target.sprint.value,
        })
        .then((response: any) => {
          if (response.status === 200) {
            onFinish()
          }
        });
    } catch (error) {}
  };

  return (
    <div>
      {datas ? (
        <table>
          <thead>
            <tr
              style={{
                display: "flex",
                width: "280px",
                justifyContent: "space-between",
              }}
            >
              <th style={{ padding: "5px" }}>Name</th>
              <th style={{ padding: "5px" }}>Description</th>
              <th style={{ padding: "5px"}}>Color</th>
              <th style={{ padding: "5px" }}>Add</th>
            </tr>
          </thead>
          {datas &&
            datas?.map((person) => {
              return (
                <tbody key={person._id}>
                  <tr
                    style={{
                      display: "flex",
                      width: "280px",
                      justifyContent: "space-between",
                    }}
                  >
                    <td style={{ padding: "5px", width: "80px" }}>
                      {person.name.toLocaleUpperCase()}
                    </td>
                    <td style={{ padding: "5px", width: "40px" }}>
                      {person.description.toLocaleUpperCase()}
                    </td>
                    <td style={{ padding: "5px" }}>
                      <div
                        style={{
                          backgroundColor: `${person.color}`,
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                        }}
                      ></div>
                    </td>
                    <td style={{ padding: "5px" }}>
                      <button
                        style={{}}
                        type="button"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={() => {
                          handleclick(person?._id && person?._id);
                        }}
                      >
                        Add Score
                      </button>
                    </td>

                    <div className="modal fade" id="myModal" role="dialog">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                            >
                              &times;
                            </button>
                            <h4 className="modal-title">ADD SCORE</h4>
                          </div>
                          <div className="modal-body">
                            <form
                              onSubmit={handlesubmit}
                              onClick={() => {
                                setId(eachPerson?._id && eachPerson?._id);
                              }}
                              action="submit"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "200px",
                                justifyContent: "center",
                                margin: "0 auto",
                              }}
                            >
                              <section>{`${
                                eachPerson?.name.toLocaleUpperCase() +
                                " " +
                                "(" +
                                eachPerson?.description.toLocaleUpperCase() +
                                ")"
                              }`}</section>

                              <label htmlFor="quarter">Year</label>
                              <select
                                name="date"
                                placeholder="Date"
                                style={{
                                  width: "180px",
                                }}
                              >
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                              </select>

                              <label htmlFor="point">Point</label>
                              <input
                                name="point"
                                placeholder="Point"
                                style={{
                                  width: "180px",
                                }}
                              />

                              <label htmlFor="quarter">Quarter</label>
                              <select
                                name="quarter"
                                style={{
                                  width: "180px",
                                }}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>

                              <label htmlFor="sprint">Sprint</label>
                              <select
                                name="sprint"
                                style={{
                                  width: "180px",
                                }}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <button
                                style={{ margin: "20px" }}
                                type="submit"
                                className="btn btn-default"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </tr>
                </tbody>
              );
            })}
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListPeople;
