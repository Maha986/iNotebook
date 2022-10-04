const mongodbConnect=require('./db');
const express = require('express')
const cors = require('cors');

mongodbConnect();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
//Avaiable Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})