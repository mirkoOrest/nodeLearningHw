const {Router} = require('express');


const productRouter = Router();

const {productController} = require('../../controllers')

const checkIsProductExists = require('../../middlewares/product/check-is-product-exists')
const checkIsProductValid = require('../../middlewares/product/check-is-product-valid')


productRouter.get('/', productController.getAllProducts);


productRouter.use('/:id', checkIsProductExists)
productRouter.get('/:id', productController.getOneProduct);
productRouter.delete('/:id', productController.deleteProduct)


productRouter.use('/', checkIsProductValid)
productRouter.post('/', productController.createProduct);
productRouter.put('/', productController.updateProduct);


module.exports = productRouter;
