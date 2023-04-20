const express=require('express');
const app=express();

const PORT=process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})

app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
  }); //Line 11