
import axios from 'axios';

const BASE = 'https://milne.herokuapp.com/api';
const CREATE_TRADESHOW = '/create-tradeshow';
const GET_TRADESHOWS = '/get-tradeshows';
const DELETE = '/delete';

export function getAllJuices (callback) {
  axios.get(BASE + '/get-juices').then(function(response) {
    callback(true, response);
  }).catch(e => {
    callback(false, e);
  });
}

export function createTradeshow(data, callback) {
  axios.post(BASE + CREATE_TRADESHOW, data)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function getTradeshows(callback) {
  axios.get(BASE + GET_TRADESHOWS)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function getLocation(url, callback) {
  axios.get(url).then(response => callback(null, response.data)).catch(e => callback(e))
}

export function deleteTradeshow(id, callback) {
  axios.post(BASE + DELETE, id)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function getCityState(zip, callback) {
  //http://maps.googleapis.com/maps/api/geocode/json?address=77379&sensor=true
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&sensor=true&key=' + 'AIzaSyADBNOX3rV-kz0kCsVqlALyebhC6zk_eec';

  axios.get(url)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}
