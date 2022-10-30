import React, { useState } from "react";
import { PersonData, Score } from "../types";
import axios from "axios";
interface Props {
  datas: PersonData[];
  onFinish: (newDatas: PersonData[]) => void;
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
            // console.log(response.data.data.scores);
            setEachPerson(response.data.data);
            setData(response.data.data.scores);
          }
        });
    } catch (error) {}
  };

  const handlesubmit = async (e: any) => {
    try {
      await axios
        .post(`http://localhost:3001/demo/createbyid/${id}`, {
          scores: [
            {
              point: e.target.point.value,
              date: e.target.date.value,
              quarter: e.target.quarter.value,
              sprint: e.target.sprint.value,
            },
          ],
        })
        .then((response: any) => {
          if (response.status === 200) {
            console.log("ok");
            window.location.reload();
          }
        });
    } catch (error) {}
  };

  return (
    <div>
      {datas ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          {datas &&
            datas?.map((person) => {
              return (
                <tbody key={person._id}>
                  <tr>
                    <td>{person.name}</td>
                    <td>{person.description}</td>

                    <button
                      type="button"
                      className="btn btn-info btn-lg"
                      data-toggle="modal"
                      data-target="#myModal"
                      onClick={() => {
                        handleclick(person?._id && person?._id);
                      }}
                    >
                      Add Score
                    </button>

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
                            <h4 className="modal-title">Add</h4>
                          </div>
                          <div className="modal-body">
                            <form
                              onSubmit={handlesubmit}
                              onChange={() => {
                                setId(person._id);
                              }}
                              action="submit"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <pre>{eachPerson?.name}</pre>
                              <input name="date" placeholder="Date" />
                              <input name="point" placeholder="Point" />
                              <select name="sprint">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <select name="quarter">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-default"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-default"
                                  data-dismiss="modal"
                                >
                                  Submit
                                </button>
                              </div>
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
