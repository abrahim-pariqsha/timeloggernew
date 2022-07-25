import axios from "axios";

export default function createClient(token) {
  let config = {
    baseURL: "http://timelogger.webstagdummy.com/timelogger/",
  };
  if (token) {
    config["headers"]={
        "Authorization":`Bearer ${token}`
    };
  }
  return axios.create(config);
}
