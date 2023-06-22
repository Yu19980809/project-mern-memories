import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signIn = async ( req, res ) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne( { email } );
    if ( !existingUser ) res.status( 400 ).json( { message: "User doesn't exist." } );

    const isPasswordCorrect = bcrypt.compare( password, existingUser.password );
    if ( !isPasswordCorrect ) res.status( 400 ).json( { message: 'Wrong password.' } );

    // The socond params is the secret for jwt encryption and decryption
    const token = jwt.sign( { email: existingUser.email, id: existingUser._id }, 'testSecret', { expiresIn: '1h' } );
    res.status( 200 ).json( { result: existingUser, token } );
  } catch (error) {
    res.status( 400 ).send( error );
  }
};

const signUp = async ( req, res ) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    if ( password !== confirmPassword ) res.status( 400 ).json( { message: "Passwords don't match." } );

    const existingUser = await User.findOne( { email } );
    if ( existingUser ) res.status( 400 ).json( { message: 'User already exists.' } );

    const hashedPassword = await bcrypt.hash( password, 12 );
    const newUser = await User.create( {
      name: `${ firstName } ${ lastName }`,
      email,
      password
    } );
    const token = jwt.sign( { email: newUser.email, id: newUser._id }, 'testSecret', { expiresIn: '1h' } );
    res.status( 200 ).json( { result: newUser, token } );
  } catch (error) {
    res.status( 400 ).send( error );
  }
};

export {
  signIn,
  signUp
};
