module.exports = (req, res, next) => {
    const {id, name, price} = req.body
    try {
        if (!name || !price) {
            throw new Error("Product is not valid")
        }

        if (price < 1) {
            throw new Error("price is too little")
        }

        if (name.length < 1) {
            throw new Error('name is too short')
        }
        if (id < 1) {
            throw new Error('choose another id')
        }

    } catch (e) {
        res.end(e.message);
    }


    next()
}
