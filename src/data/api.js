import axios from 'axios'

const apiKey = 'fb394c8'

export const getResultsRequest = (title, page) =>
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}&page=${page}`)

export const getDetailRequest = (id) =>
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
