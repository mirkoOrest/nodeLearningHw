let {products} = require('../../data/product/product')

class ProductService {

    getAllProducts(){
        return products
    }

    getProduct(id){

        return products.find(value => value.id === id);
    }

    deleteProduct(id){
        products = products.filter(value => value.id !== id);
    }

    createProduct(id,name,price){
        products.push({id,name,price})
    }

    updateProduct(id,newName,newPrice){
        let arr = []
        const findProduct = products.find(value => value.id === id);
        arr.push(findProduct)
        arr.map(value => {
            value.name = newName
            value.price = newPrice
            return value

        })
    }
}


module.exports = new ProductService;
