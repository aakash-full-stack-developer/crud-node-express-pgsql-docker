const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status').status
const { prisma } = require('../utils/database')

const createProduct = async (productBody) => {
  const { name } = productBody;

  const existingProduct = await prisma.product.findFirst({
    where: {
      name
    }
  });  
  if (existingProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already exists');
  }

  const product = await prisma.product.create({
    data: {
      name
    }
  })
  return product;
}

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found !!");
  }
  return product
}

const getProductList = async () => {
  const products = await prisma.product.findMany();
  return products;
}
  
const updateProduct = async (productId, updatedProductInfo) => {
  return prisma.product.update({
    where: { id: productId },
    data: updatedProductInfo,

  });
};

const deleteProductById = async (id) => {
  const product =  await getProductById(id)
  if(!product){
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found !!");
  }
  return prisma.product.delete({
    where: { id },
  });
};


module.exports = {
  createProduct,
  updateProduct,
  getProductById,
  getProductList,
  deleteProductById
}
