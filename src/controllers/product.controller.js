const httpStatus = require('http-status').status
const catchAsync = require('../utils/catchasync.func')
const ApiSuccessResponse = require('../utils/apiresponse.func')
const { productManager } = require('../manager')

const createProduct = catchAsync(async (req, res) => {
  const data = await productManager.createProduct(req.body)
  res.status(httpStatus.CREATED).send({ success: true, message: 'Product created successfully', data })
})

const productList = catchAsync(async (req, res) => {
  const data = await productManager.getProductList(req)
  res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'Product Retrieved successfully'))
})

const getSingleProduct = catchAsync(async (req, res) => {
  const data = await productManager.getSingleProduct(req)
  res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'Product Details Retrieved successfully'))
})

const updateProduct = catchAsync(async (req, res) => {
  const data = await productManager.updateProduct(req)
  res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'Product updated successfully'))
})

const deleteProduct = catchAsync(async (req, res) => {
  const data = await productManager.deleteProductById(req.params.productId)
  res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'Product deleted successfully'))

})

module.exports = {
  productList,
  updateProduct,
  deleteProduct,
  createProduct,
  getSingleProduct
}
