
const express = require('express');
const app = express();
const cors =require('cors');
const port = process.env.PORT || 5000;


const gallery =require ('./Data/Gallery.json')

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Viewers!')
})
app.get('/gallery', (req, res) => {
    res.send(gallery);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
