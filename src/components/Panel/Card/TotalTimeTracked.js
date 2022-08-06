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
      {/* <img src="https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2147483647&v=beta&t=i4Pp6zVfz5VAznPIik_ua4I75sKlu4yAdGKgHC9vpTo" alt="BigCo Inc. logo"/> */}
        <div>
         
        <h1 className="text-primary">Total Time</h1>
        </div>
          <h3 className="text-muted">{Data?.table1?.[0]?.totaltime}</h3>
        </div> 
      </div>
    </div>
  );
}

export default TotalTimeTracked;
