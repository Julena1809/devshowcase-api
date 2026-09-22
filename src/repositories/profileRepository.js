const prisma = require('../database/prisma');

class ProfileRepository {
    async create(data) {
        return prisma.profile.create({
            data
        });
    }
    async findById(id) {
    return prisma.profile.findUnique({
        where: { id }
    });
}
}

module.exports = new ProfileRepository();