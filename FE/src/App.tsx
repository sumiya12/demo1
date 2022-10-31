import axios from "axios";
import { useState, useEffect } from "react";
import { PersonData } from "./types";
import LineChart from "./components/LineChart";
import AddPeople from "./components/AddPeople";
import ListPeople from "./components/ListPeople";

function App() {
  const [data, setData] = useState<PersonData[]>([]);
  const fetcher = async () => {
    try {
      const result = await axios.get("http://localhost:3001/demo/get");
      setData(result.data.data);
    } catch (error) {}
  };
  const handleFinish = () => {
    fetcher();
  };

  useEffect(() => {
    if (data.length === 0) fetcher();
  }, []);

  return (
    <div>
      {data?.length ? (
        <div
          style={{
            display: "flex",
            alignItems: "center ",
            margin: "0 auto",
            justifyContent: "center",
            maxWidth: "100vw",
            height: "80vh",
          }}
        >
          <div>
            <AddPeople onFinish={handleFinish} datas={data} />
            <ListPeople datas={data} onFinish={handleFinish} />
          </div>

          <LineChart datas={data} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
