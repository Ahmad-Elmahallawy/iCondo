const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.role.createMany({
        data: [
            { name: 'Admin' },
            { name: 'Manager' },
            { name: 'FinancialManager' },
            { name: 'Operator' },
            { name: 'CondoOwner' },
            { name: 'Rental' },
            { name: 'PublicUser' }
        ]
    });

    console.log('Seed data inserted successfully');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });