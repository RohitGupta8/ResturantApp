import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET, {expiresIn: '5h'});
};

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(body.password, salt)
  body.password = hash
  const data = await User.create(body);
  return data;
};

export const loginUser = async (body) => {
  const check = await User.findOne({email: body.email});
  if (!check) {
    throw new Error('User not registered....');
  } else {
    const match = await bcrypt.compare(body.password, check.password);
    if (match) {
      const user = {name: check.name, dob: check.dob, sex: check.sex, email: check.email, phone: check.phone, id: check._id, role: check.role}
      return generateToken(user)
    } else {
      throw new Error('Incorrect Password');
    }
  }
};

export const forgotPassword = async (body) => {
  let message
  const user = await User.findOne({email: body.email, dob: body.dob});
  if (!user) {
    message = {message: 'Email or Date of Birth do not match.'};
  } else if (body.newPassword !== body.confirmPassword) {
    message = {message: 'New Password and Confirm Password do not match.'};
  } else {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    message = {message: 'Password updated successfully'};

  }
  return message

};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
