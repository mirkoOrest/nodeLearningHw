const {userService} = require('../../service')

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        if (+id < 0) {
            return res.status(400).json({message: 'Wrong ID'})
        }
        const user = await userService.getUserByParams(id);

        if (!user) {
            return res.sendStatus(404)
        }

        req.user = user;


    } catch (e) {
        res.end(e.message);
    }


    next()
}


