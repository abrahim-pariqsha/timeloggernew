import React,{useState,useEffect} from "react";

function IdelMInutes() {
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
     <div className="card-body" id="card2" >
       <div>
        
       <span className="text" >Idle Time</span>
       </div>
         <span className="text-num">{Data?.table2?.[0]?.idletime}</span>
     <img id="img" src="./img/comp.png"></img>
       </div> 
     </div>
   </div>
  );
}

export default IdelMInutes;
