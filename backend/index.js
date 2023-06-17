const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const bodyParser=require('body-parser');
const morgan=require('morgan');

require('dotenv').config();

const app=express();

app.set('trust proxy', true);

app.use(helmet())
app.use(cors(
    {
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    }
))


//PORT no
const PORT=5001||process.env.PORT;

//openAIApi routes
const openAiApiRoutes=require('./routes/openAiApiRoutes');


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







