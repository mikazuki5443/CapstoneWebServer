const pool = require('../src/config/db');
const bcrypt = require('bcryptjs');

//기존 비밀번호데이터를 해싱값으로 업데이트하기위한 임시 스크립트
const updatePassword = async () => {
    try {
        const [users] = await pool.query('SELECT user_no, user_pwd FROM user');

        for(const user of users) {
            const hashedPassword = await bcrypt.hash(user.user_pwd, 10);
            await pool.query('UPDATE user SET user_pwd = ? WHERE user_no = ?', [hashedPassword, user.user_no]);
            console.log(`UPDATE password for user_no : ${user.user_no}`);
        }

        console.log('All passwords have been update.');
        process.exit(0);

    }catch(err) {
        console.error('Error updating passwords: ' ,err);
        process.exit(1);
    }
};

updatePassword();
