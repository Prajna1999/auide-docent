const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const morgan=require('morgan');

require('dotenv').config();

const app=express();
//PORT no
const PORT=5001||process.env.PORT;

//openAIApi routes
const openAiApiRoutes=require('./routes/openAiApiRoutes');

//cors
app.use(cors({
  origin:"http://127.0.0.1:5173"
}))

// middleware for parsing requrest bodies and logging
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'))

app.get('/', (req, res)=>{
  res.send("hello from the server 5001")
})

//mout the museum router to the defined path
app.use('/api/v1', openAiApiRoutes);

//start the server
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})







