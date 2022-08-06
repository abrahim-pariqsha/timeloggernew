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
      let Data = start - end; // in ms
      setData(format_ms(Data));
    };
    fetchData();
  });

  // console.log("kk", diff)
  return (
    <>
   
    <div>
      <div>
        <div className="card-body" id="card2">
          {/* <img src="https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2147483647&v=beta&t=i4Pp6zVfz5VAznPIik_ua4I75sKlu4yAdGKgHC9vpTo" alt="BigCo Inc. logo"/> */}
          <div>
            <h1 className="text-success">Productive Time</h1>
          </div>
          {/* <div className="donut">
          <DonutChart
        data={[
          {
            label: "Give you up",
            value:Data?.table1?.[0]?.totaltime,
          },
          {
            label: "hkjh",
            value: (Data.table2?.[0]?.idletime),
            isEmpty: true,
          },
        ]}
      />
      </div> */}
          <h3 className="text-muted">{Data}</h3>
        </div>
      </div>
    </div>
</>
  );
}

export default ProductiveTime;
