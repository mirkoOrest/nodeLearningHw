const {productService} = require('../../service')

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        if (+id < 0) {
            return res.status(400).json({message: 'Wrong ID'})
        }
        const product = await productService.getOneProduct(id);

        if (!product) {
            return res.sendStatus(404)
        }

        req.product = product;


    } catch (e) {
        res.end(e.message);
    }


    next()
}


