
module.exports = (req, res, next) => {
    const {id,newName,newPrice} = req.body
    try {
        if (!id || !newName || !newPrice){
            throw new Error("Product is not valid")
        }

        if(newPrice<1){
            throw new Error("price is too little")
        }

        if (newName.length<1){
            throw new Error('name is too short')
        }
        if (id<1){
            throw new Error('choose another id')
        }

    }catch (e) {
        res.end(e.message);
    }


    next()
}
