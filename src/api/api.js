
import axios from 'axios';

const BASE = 'https://milne.herokuapp.com';

export function getAllJuices (callback) {
  axios.get(BASE + '/get-juices').then(function(response) {
    callback(true, response);
  }).catch(e => {
    callback(false, e);
  });
}
