const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const getUserById = async (user_id) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ?',[user_id]);
    return rows[0];
}

const createUser = async (userData) => {
    const {user_id, user_pwd, user_name, user_phone, user_email } = userData;
    const hashedPassword = await bcrypt.hash(user_pwd, 10);
    const [result] = await pool.query(
        'INSERT INTO user (user_id, user_pwd, user_name, user_phone, user_email) VALUES (?, ?, ?, ?, ?)',
        [user_id, hashedPassword, user_name, user_phone, user_email]
    );
    return result.insertId;
}

const generateAuthToken = (user) => {
    const token = jwt.sign(
        { user_no: user.user_no, user_id: user.user_id, user_name:user.user_name,user_phone:user.user_phone, user_email:user.user_email},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );
    return token;
}


module.exports = {
    getUserById,
    createUser,
    generateAuthToken
};