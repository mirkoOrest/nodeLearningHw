const {productService} = require('../../service')

module.exports = {

    getAllProducts: (req,res) => {
        const products = productService.getAllProducts()

        res.json(products)
    },

    getProduct:(req,res) => {
        const {id} = req.params;
        const product = productService.getProduct(+id)

        res.json(product)
    },

    deleteProduct:(req,res) => {
        const {id} = req.params;
        productService.deleteProduct(+id)

        res.json()
    },

    createProduct:(req,res) => {
        const {id,name,price} = req.body;
        productService.createProduct(id,name,price)

        res.json()
    },

    updateProduct:(req,res) => {
        const {id,newName,newPrice} = req.body;
        productService.updateProduct(id,newName,newPrice)

        res.json()
    }

};
