const {Router} = require('express');


const productRouter = Router();

const {productController} = require('../../controllers')
const checkIsProductValid = require('../../middlewares/product/check-is-product-valid')


productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getOneProduct);
productRouter.delete('/:id', productController.deleteProduct)
productRouter.post('/', checkIsProductValid, productController.createProduct);
productRouter.put('/', checkIsProductValid, productController.updateProduct);


module.exports = productRouter;
