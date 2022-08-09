import React, { useState, useEffect } from "react";
import moment from "moment";
import DonutChart from "react-donut-chart";
function ProductiveTime() {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/totalcount");
      const data = await response.json();

      function format_ms(time_ms) {
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        hours = parseInt(time_ms / 3600000).toString();

        time_ms %= 3600000;

        minutes = parseInt(time_ms / 60000).toString();

        time_ms %= 60000;

        seconds = parseInt(time_ms / 1000).toString();

        return (
          hours +
          ":" +
          minutes.padStart(2, "0") +
          ":" +
          seconds.padStart(2, "0")
        );
      }

      let start = moment.duration(data.table1?.[0]?.totaltime, "hh:mm:ss");
      let end = moment.duration(data.table2?.[0]?.idletime, "hh:mm:ss");
      let Data = start - end;
      setData(format_ms(Data));
    };
    fetchData();
  });
  return (
    <>
      <div>
        <div>
          <div className="card-body" id="card2">
            <div>
              <span className="text">Productive Time</span>
            </div>
            <span className="text-num">{Data}</span>
            <img id="img" src="./img/members.png"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductiveTime;
