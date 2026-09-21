const profileRepository = require('../repositories/profileRepository');

class ProfileService {
    async create(data) {
        return profileRepository.create(data);
    }
}

module.exports = new ProfileService();
