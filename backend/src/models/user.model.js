import {Schema, model} from 'mongoose';

const userSchema = new Schema(
  {
    name: {type: String, required: true, },
    dob: {type: String, required: true, },
    sex: {type: String, required: true, },
    phone: {type: String, required: true, },
    email: {type: String, unique: true, required: true, },
    password: {type: String, required: true},
    role: {type: String, required: true},
  },
  {
    timestamps: true
  }
);

export default model('ResturantUser', userSchema);
