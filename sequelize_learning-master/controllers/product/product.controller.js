const {productService} = require('../../service')

module.exports = {

    getAllProducts: async (req,res) => {
        try {
            const products = await productService.getAllProducts()
            res.json(products)
        } catch (e) {
            res.json(e)

        }

    },

    getOneProduct: async (req,res) => {
        try {
            const {id} = req.params;
            const product = await productService.getOneProduct(+id)
            res.json(product)
        } catch (e) {
            res.json(e)

        }
    },

    deleteProduct: async (req,res) => {
        try {
            const {id} = req.params;
            productService.deleteProduct(+id)

            res.json()
        } catch (e) {
            res.json(e)

        }

    },

    createProduct: async (req,res) => {
        try {
            productService.createProduct(req.body)

            res.json()
        } catch (e) {
            res.json(e)

        }
    },

    updateProduct: async (req,res) => {
        try {
            productService.updateProduct(req.body)

            res.json()
        } catch (e) {
            res.json(e)

        }
    }
};
