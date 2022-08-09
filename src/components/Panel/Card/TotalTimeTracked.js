import React, { useState, useEffect } from "react";

function TotalTimeTracked() {
  const [Data, setData] = useState({});


  
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/totalcount")
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <div>
     <div>
      <div className="card-body" id="card2">
        <div>
         
        <span className="text">Total Time</span>
        </div>
          <span className="text-num">{Data?.table1?.[0]?.totaltime}</span>
          <img id="img" src="./img/clock.png"></img>
        </div> 
      </div>
    </div>
  );
}

export default TotalTimeTracked;
