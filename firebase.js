const { initializeApp } = require('firebase/app')
const dotenv =  require('dotenv')


//aqui va la firebaseConfig
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);


module.exports = {app:app}