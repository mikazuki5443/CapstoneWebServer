// src/controllers/userController.js

const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try{
        const {user_id, user_pwd, user_name, user_phone, user_email} = req.body;
        const existingUser = await userModel.getUserById();

        if(existingUser)
        {
            return res.status(400).json({error : 'User already exists'});
        }

        const user_no = await userModel.createUser({user_id, user_pwd, user_name, user_phone, user_email});
        const user = {user_no, user_id, user_name, user_phone, user_email};

        console.log('user registered successfully:', user);
        res.status(201).json({user});
    }catch(err){
        console.log('Error registering user:', err);
        res.status(500).json({error: 'Failed to register user'});
    }
};

const LoginUser = async (req, res) => {
    try{
        const {user_id, user_pwd } = req.body;
        const user = await userModel.getUserById(user_id);

        if(!user)
        {
            return res.status(400).json({error: 'Invalid user ID'});
        }

        const isPasswordMatch = await bcrypt.compare(user_pwd, user.user_pwd);
        console.log('Password match result:',isPasswordMatch);
        if(!isPasswordMatch)
        {
            return res.status(400).json({error: 'Invalid user Password'});
        }

        const token = userModel.generateAuthToken(user);
        //await updateUserActivity(user.user_no, true);//로그인 시 활동 상태 업데이트
        console.log('User logged in succesfully:', user);
        res.status(200).json({token});

    }catch(err){
        console.log('Error logging in user: ', err);
        res.status(500).json({error: 'Failed to login'});
    }
};

const LogoutUser = async (req, res) => {

    try {
        //await updateUserActivity(req.user.user_no, false);
        res.status(200).json({message: 'User logged out successfully'});
    }catch(err){
        console.log('Error logging out user: ', err);
        res.status(500).json({error: 'Failed to logout'});
    }
};
const getUserProfile = async (req, res) => {

    try {
        const user = await userModel.getUserById(req.user.user_no);

        if(!user)
        {
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json({
            user_no: user.user_no,
            user_id: user.user_id,
            user_name: user.user_name,
            user_phone: user.user_phone,
            user_email: user.user_email
        });
    } catch (err) {
        console.log('Error fetching user profile:', err);
        res.status(500).json({error: 'Failed to fetch user profile'});
    }
};

module.exports = {
    registerUser,
    LoginUser,
    LogoutUser,
    getUserProfile
};
