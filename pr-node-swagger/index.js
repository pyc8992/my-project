const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  try {
    res.send('API Test!');
  } catch (e) {
    next(e);
  }
});

app.get('/adder', (req, res, next) => {
  try{
    const one = req.query.one;
    const two = req.query.two;
    const result = Number(one) + Number(two);
    res.status(200).send(String(result));
  }catch(e){
    next(e);
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`server started port : ${port}`)
});
