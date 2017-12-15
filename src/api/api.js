
import axios from 'axios';

const BASE = 'https://milne.herokuapp.com';

export function getAllJuices (callback) {
  axios.get(BASE + '/get-juices').then(response => {
    callback(response);
  }).catch(e => {
    callback(e);
  });
}
