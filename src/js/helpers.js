import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';
// goal of this module is to contain a couple of functions that we reuse over and over in our project.

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      // headers are some snippetsof text which are like information about the request itself
      headers: {
        // we specify in th request that the data that we're gonna send is going to be in the JSON format
        // then only our API correctly accept the data and creates a new Recipe in the database
        'Content-Type': 'application/json',
      },
      // data we want to send (should be in JSON)
      body: JSON.stringify(uploadData),
      // DEFINATION : Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // Forkify API actually return the data that we sent
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
