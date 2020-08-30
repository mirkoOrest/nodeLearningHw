const jwt = require('jsonwebtoken');

const {
    tokensWordsEnum: {
        JWT_SECRET,
        JWT_REFRESH_SECRET
    }
} = require('../constants');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_SECRET, {expiresIn: '999999d'})
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '1d'})

    return {
        access_token,
        refresh_token
    }
};
