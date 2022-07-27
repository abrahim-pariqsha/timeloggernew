import { useCallback, useState } from "react";
import { token } from "../Constants/Contansts";

export const useFetchClient = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClients = useCallback(() => {
    setLoading(true);
    fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/client?fields=*.*",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClients(data.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  return { clients, getClients, loading };
};
