import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

// config
dotenv.config();

// init app
const app = express();

// middleware
app.use( bodyParser.json( { limit: '30mb', extended: true } ) );
app.use( bodyParser.urlencoded( { limit: '30mb', extended: true } ) );
app.use( cors() );

// routes
app.use( '/api/v1/posts', postRoutes );
app.use( '/api/v1/user', userRoutes );

// mongodb
const port = process.env.PORT;
const url = process.env.MONGODB_URL;
mongoose.set( 'strictQuery', true );
mongoose.connect( url )
  .then( () => {
    console.log( 'Connected to mongodb' );
    app.listen( port, () => console.log( `Server running on port ${ port }` ) )
  } )
  .catch( error => console.log( error ) );
