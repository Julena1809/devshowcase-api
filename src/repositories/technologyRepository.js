const prisma = require('../database/prisma');

class TechnologyRepository {
    async create(data) {
        return prisma.technology.create({
            data
        });
    }
}

module.exports = new TechnologyRepository();
