import axios from 'axios'

export const BASE_URL = 'http://127.0.0.1:8000'

export const axios_request = axios.create({
  baseURL: BASE_URL
})

// axios_request.interceptors.response.use((response) => {
//   return response
// }, async (error) => {
//   if (error.response.data.message === 'Unauthorized') {
//     try {
//       const requestConfig = { ...error.config };
//       await api({
//         method: 'get',
//         url: '/auth/refresh',
//       });
//       return axios.request(requestConfig);
//     } catch {
//       store.dispatch(logout())
//     }
//   }
//   else {
//     throw error
//   }
// })

// export default axios_request