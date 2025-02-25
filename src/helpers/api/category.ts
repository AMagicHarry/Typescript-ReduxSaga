import axios from "axios";

function getCategories() {
  return axios.get('/categories');
}

export { getCategories };