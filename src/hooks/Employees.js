import { useCallback, useState } from "react";
import { token } from "../Constants/Contansts";

export const useFetchEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmployees = useCallback(() => {
    setLoading(true);
    fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/employee?fields=*.*",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  return { employees, getEmployees, loading };
};