require('events').EventEmitter.defaultMaxListeners = 20;
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

const connectDB = require('./connect/connectdb')
const {BadRequest} = require('./error/customError')
const router = require('./routes/authRouter')
const errorHandler = require('./middleware/customErrorHandler')
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
// app.use(express.static('/Frontend/src'))
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const start = async () =>{
  try{
    await connectDB(process.env.MONGO_URL)
app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
})}
 catch(error){
  console.log(console.error())
  }
}

start();