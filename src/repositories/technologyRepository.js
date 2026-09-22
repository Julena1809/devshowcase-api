const prisma = require('../database/prisma');

class TechnologyRepository {
    async create(data) {
        return prisma.technology.create({
            data
        });
    }
    async findAll() {
        return prisma.technology.findMany({
            orderBy: {
                name: 'asc'
            }
        });
    }
}

module.exports = new TechnologyRepository();
