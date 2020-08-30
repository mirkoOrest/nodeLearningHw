const {Router} = require('express');


const productRouter = Router();

const {productController} = require('../../controllers')
const checkProductValidity = require('../../middlewares/product/check-is-product-valid')
const checkProductUpdate = require('../../middlewares/product/check-is-update')

productRouter.get('/',productController.getAllProducts);
productRouter.get('/:id',productController.getProduct);
productRouter.delete('/:id', productController.deleteProduct)
productRouter.post( '/',checkProductValidity, productController.createProduct);
productRouter.put( '/',checkProductUpdate, productController.updateProduct)


module.exports = productRouter;
