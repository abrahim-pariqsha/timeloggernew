import { useCallback, useState } from "react";
import { token } from "../Constants/Contansts";

export const useFetchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProjects = useCallback(() => {
    setLoading(true);
    fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/project?fildes*.*",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  return { projects, getProjects, loading };
};