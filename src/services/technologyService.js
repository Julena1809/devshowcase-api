const technologyRepository = require('../repositories/technologyRepository');

class TechnologyService {
    async create(data) {
        return technologyRepository.create(data);
    }
}

module.exports = new TechnologyService();

