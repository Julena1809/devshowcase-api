const technologyRepository = require('../repositories/technologyRepository');

class TechnologyService {
    async create(data) {
        return technologyRepository.create(data);
    }
    async findAll() {
        return technologyRepository.findAll();
    }
}

module.exports = new TechnologyService();

