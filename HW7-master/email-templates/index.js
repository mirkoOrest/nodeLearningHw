const {emailActionEnum} = require('../constants');

module.exports = {
    [emailActionEnum.USER_REGISTER]: {
        subject: '[Some text] Welcome',
        templateFileName: 'userCreate'
    },
    [emailActionEnum.USER_UPDATE]: {
        subject: '[Some text] update user',
        templateFileName: 'userUpdate'
    },
    [emailActionEnum.USER_DELETE]: {
        subject: '[Some text] delete user',
        templateFileName: 'userDelete'
    },
    [emailActionEnum.PRODUCT_DELETE]: {
        subject: '[Some text] delete product',
        templateFileName: 'productDelete'
    },
    [emailActionEnum.PRODUCT_UPDATE]: {
        subject: '[Some text] update product',
        templateFileName: 'productUpdate'
    }

};
