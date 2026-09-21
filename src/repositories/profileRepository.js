const prisma = require('../database/prisma');

class ProfileRepository {
    async create(data) {
        return prisma.profile.create({
            data
        });
    }
}

module.exports = new ProfileRepository();