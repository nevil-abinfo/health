import axios from 'axios';
export const AxiosAPI = (endpoint, method, body, type) =>
  new Promise(async (resolve) => {
    const url = process.env.REACT_APP_API_URL + endpoint;
    const token = localStorage.getItem("token")
    axios({
      method,
      url,
      data:body,
      responseType: type,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then((res) => {
        let response = res && res.data
        resolve(response);
      })
      .catch((err) => {
        console.log(`error axios common`, err);
        resolve(false);
      });
  }); 
