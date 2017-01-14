import request from 'request-promise';
import retry from 'retryer';

// Define options
const options = {
  debug: false,
  timeout: 2500,
  total: 3,
  onStart,
  onError
};

// STEP 1: create function that returns promise
function sendRequest() {
  return request('http://google.com/');
  // OR
  // return request('http://non-existing-resource.com/');
}

// STEP 2: Pass that function to the retry(FUNCTION_NAME)
// Notice that we pass `sendRequest` without brackets `sendRequest()`
// ✅ (Correct) retry(sendRequest)
// ❌ (Wrong)   retry(sendRequest())
retry(sendRequest, options)
  .then(data => console.log('🛰 Gliding the space'))
  .catch(error => console.log('🚧 Sorry mate, the rocket is broken. You cannot fly to the moon ATM'))



// Some helper functions
function onStart(attempt) {
  console.log(`🌍 🚀 🌑 Flying to the moon #${attempt} time`);
}

function onError(err, attempt) {
  if (attempt >= 3) {
    return;
  }

  if (attempt >= 2) {
    return console.log(`📛 📛 📛 Oh, crap! Retrying the last time 🚦`);
  }

  console.log(`📛 📛 📛 Oh, crap! Something went wrong. Restarting engine in 2sec 🚦`);
}
