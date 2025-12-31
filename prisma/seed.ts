import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@docray.com' },
    update: {},
    create: {
      email: 'admin@docray.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const legal = await prisma.user.upsert({
    where: { email: 'legal@docray.com' },
    update: {},
    create: {
      email: 'legal@docray.com',
      name: 'Legal Counsel',
      role: 'LEGAL',
    },
  });

  const finance = await prisma.user.upsert({
    where: { email: 'finance@docray.com' },
    update: {},
    create: {
      email: 'finance@docray.com',
      name: 'Finance Manager',
      role: 'FINANCE',
    },
  });

  // Create sample contract
  const contract = await prisma.contract.upsert({
    where: { id: 'sample-contract-1' },
    update: {},
    create: {
      id: 'sample-contract-1',
      title: 'Sample Service Agreement',
      status: 'IN_REVIEW',
      fileUrl: '/uploads/sample.pdf',
      createdById: admin.id,
      parties: {
        create: [
          { name: 'ABC Corp', role: 'Client' },
          { name: 'XYZ Services', role: 'Vendor' },
        ],
      },
    },
  });

  // Create sample approval
  await prisma.approval.upsert({
    where: { id: 'sample-approval-1' },
    update: {},
    create: {
      id: 'sample-approval-1',
      contractId: contract.id,
      approverId: legal.id,
      status: 'PENDING',
      comments: 'Please review the terms carefully',
    },
  });

  // Create sample audit log
  await prisma.auditLog.create({
    data: {
      contractId: contract.id,
      userId: admin.id,
      action: 'CONTRACT_CREATED',
      details: { title: contract.title },
    },
  });

  console.log('Sample data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });