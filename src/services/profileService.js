const profileRepository = require('../repositories/profileRepository');

class ProfileService {
    async create(data) {
        return profileRepository.create(data);
    }
    async findById(id) {
    return profileRepository.findById(id);
 }
}

module.exports = new ProfileService();
