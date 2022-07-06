import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useFetchEmployee } from "../../../hooks/Employees";
function Header() {
  const initaldata = {
    name: "",
    description: "",
    project: "",
    status: "",
    due_date: "",
  };
  const [add, setAdd] = useState(initaldata);
  const {  employee} = add;
  const onInputChange = (e) => {
    setAdd({ ...add, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getEmployees();
    // console.log("akjsdhkajsd", getEmployees)
  }, []);
  const { employees, getEmployees } = useFetchEmployee();
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className="dashboard-section">
              <ul className="nav ">
                <li>Today</li> <li> Yesterday</li>
                <li> Past 7 days</li>
                <li> Past 30 days</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="input-group">
              <input type="date" className="date-field" />
            </div>
          </div>

          <div className="col-2">
            <div className="input-group">
            <>
              <select
                className="form-control mb-2"
                name="employee"
                value={employee}  
                onChange={(e) => onInputChange(e)}
                required
              >
                <option>Select Employee</option>
                {employees?.map((d, i) => (
                  <option key={i} value={d.id}>
                    {d?.user.first_name}
                  </option>
                ))}
              </select>
            </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
