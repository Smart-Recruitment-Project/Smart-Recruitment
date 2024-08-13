const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./db/Connection');
const router = require('./Routes/router');
const port = 8000;


//miidleware
app.use(express.json());
app.use(cors());
app.use(router);


/*app.get('/', (req, res) => {
  res.send('Hello World!');
});*/
  
app.listen(port, () => {    
  console.log(`Server is running on port ${port}`);
}); 
