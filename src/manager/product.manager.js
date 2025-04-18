const { productDao, tokenDao } = require('../dao/')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status').status

const createProduct = async (body) => { 
  try {
    const product = await productDao.createProduct(body);
    return { product }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'Something went wrong !!')
  }
}

const getSingleProduct = async (req) => {
  const product = await productDao.getProductById(req.params.productId)
  return { product }
}

const getProductList = async (req) => {
  const products = await productDao.getProductList(req)
  return { products }
}

const updateProduct = async (req) => {
  const product = await productDao.updateProduct(req.params.productId, req.body)
  return { product }
}

const deleteProductById = async (productId) => {
  const product = await productDao.deleteProductById(productId);
  return { product };
};

module.exports = {
  updateProduct,
  createProduct,
  getSingleProduct,
  getProductList,
  deleteProductById
}

