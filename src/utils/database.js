const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Logs for debugging
});

// Function to check Prisma connection
const checkPrismaConnection = async () => {
  try {
    await prisma.$connect(); // Explicitly try to connect
    console.info('✅ Prisma connected successfully.');
    return true;
  } catch (error) {
    console.error('❌ Prisma connection failed:', error.message);
    return false;
  }
};

// Graceful shutdown handling
const disconnectPrisma = async () => {
  try {
    await prisma.$disconnect();
    console.info('🔌 Prisma disconnected successfully.');
  } catch (error) {
    console.error('❌ Error disconnecting Prisma:', error);
  }
};

module.exports = { prisma, checkPrismaConnection, disconnectPrisma };