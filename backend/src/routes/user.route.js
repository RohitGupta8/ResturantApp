import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth,setRole } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('',userController.getAllUsers);

//route to create a new user or admin
router.post('/user', setRole('user'), userController.newUser);
router.post('/admin', setRole('admin'), userController.newUser);

//login
router.post('/login', userController.loginUser);

//forgotPassword
router.post('/forget', userController.forgotPassword);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
