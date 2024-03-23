const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path'); 

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    
    if(!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }

    // Is refresh token in DB.
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refressToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // Detete refreshToken in DB
    const otherUsers = usersDB.users.filter(person => person.refressToken != foundUser.refressToken);
    const currentUser = { ...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true }); // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };