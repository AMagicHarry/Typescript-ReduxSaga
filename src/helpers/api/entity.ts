import axios from "axios";

function getEntities ()  {
  return axios.get('/entities');
}

export { getEntities };