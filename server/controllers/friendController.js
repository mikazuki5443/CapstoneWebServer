const pool = require('../config/db');

const sendFriendRequest =async (req, res) => {

    try {
        const {user_no1, user_no2} = req.body;
        await pool.query(
            'INSERT INTO friends (user_no1, user_no2, status) VALUES (?, ?, ?)',
            [user_no1, user_no2, 'pending']
        );

        res.status(201).json({message: 'Friend request sent'});

    } catch (err) {
        console.error('Error sending friend request:', err);
        res.status(500).json({error: 'Failed to send friend request'});
    }
};

const acceptFriendRequest = async (req, res) => {

    try {
        const {user_no1, user_no2} = req.body;

        await pool.query(
            'UPDATE friends  SET  status=? WHERE user_no1 = ? AND user_no2 = ?',
            ['accepted', user_no1, user_no2]
        );

        res.status(200).json({ message: 'Friend request accepted'});

    } catch (err) {
        console.error('Error accepting friend request:', err);
        res.status(500).json({error: 'Failed to accept friend request'});
    }
};

const getFriendList = async (req, res) => {

    try {
        const {user_no} = req.params;

        const [friends] = await pool.query(
            `SELECT u.user_no, u.user_id, u.user_name, u.user_phone, u.user_email, a.is_online, a.last_active
       FROM user u
       JOIN friends f ON (u.user_no = f.user_no1 OR u.user_no = f.user_no2)
       LEFT JOIN user_activity a ON u.user_no = a.user_no
       WHERE (f.user_no1 = ? OR f.user_no2 = ?) AND f.status = ?`,
            [user_no, user_no, 'accepted']
        );

        res.status(200).json({friends});
    } catch (err) {
        console.error('Error fetching friends list:', err);
        res.status(500).json({error: 'Failed to fetch friends list'});
    }
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    getFriendList
}