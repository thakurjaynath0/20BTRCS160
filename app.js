require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//connect Db
const connectDb = require('./db/connect');

app.use(express.json())
//routers
const authRouter = require('./routes/authentication');
const trainRouter = require('./routes/trains');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// routes
app.use('/train/auth', authRouter);
app.use('/train/trains', trainRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    console.log('Connected to the Db...');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
