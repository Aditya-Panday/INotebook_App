const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000 
// npm i cors
app.use(cors())
app.use(express.json())
// middle ware use kiya hai req.body ke liye
app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes')) 

// app.get('/', (req, res) => {
//   res.send('Jai shree ram!')
// })

app.listen(port, () => {
  console.log(`Inotebook Backend app listening on http://localhost:${port}`)
})