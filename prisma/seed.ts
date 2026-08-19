// this seeds the database with a super admin, distributors, sales users and products
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // this creates the super admin user
  await prisma.user.upsert({
    where: { email: 'admin@sfa.com' },
    update: {},
    create: {
      authId: 'seed-super-admin-auth-id',
      email: 'admin@sfa.com',
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });

  // this creates a distributor user
  const distributor = await prisma.user.upsert({
    where: { email: 'distributor@sfa.com' },
    update: {},
    create: {
      authId: 'seed-distributor-auth-id',
      email: 'distributor@sfa.com',
      name: 'Distributor One',
      role: 'DISTRIBUTOR',
    },
  });

  // this creates a sales user assigned to the distributor
  await prisma.user.upsert({
    where: { email: 'sales@sfa.com' },
    update: {},
    create: {
      authId: 'seed-sales-auth-id',
      email: 'sales@sfa.com',
      name: 'Sales One',
      role: 'SALES',
      distributorId: distributor.id,
    },
  });

  // this creates sample products
  const products = [
    { name: 'Product A', sku: 'SKU-A', unit: 'pcs' },
    { name: 'Product B', sku: 'SKU-B', unit: 'pcs' },
    { name: 'Product C', sku: 'SKU-C', unit: 'box' },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
