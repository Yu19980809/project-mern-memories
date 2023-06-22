import mongoose from 'mongoose';

const postSchema = new mongoose.Schema( {
  name: String,
  title: String,
  creator: String,
  message: String,
  selectedFile: String,
  tags: [ String ],
  likes: { type: [ String ], default: [] },
  comments: { type: [ String ], default: [] }
}, { timestamps: true } );

export default mongoose.model( 'Post', postSchema );
