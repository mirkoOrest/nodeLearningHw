const {Router} = require('express');


const productRouter = Router();


const {productController} = require('../../controllers');


const {productMiddleware} = require('../../middlewares');


productRouter.get('/', productController.getAllProducts);


productRouter.use('/:id', productMiddleware.checkIsProductsExist);
productRouter.get('/:id', productController.getOneProduct);
productRouter.delete('/:id', productController.deleteProduct);


productRouter.use('/:id', productMiddleware.checkIsProductsValid);
productRouter.post('/', productController.createProduct);
productRouter.put('/', productController.updateProduct);


module.exports = productRouter;
