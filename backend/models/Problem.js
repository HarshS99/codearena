// Mock Problem model for a backend without database requirement
const problems = require('../../src/data/problemsComplete').problems; // Re-use frontend data if possible

const Problem = {
  find: async () => problems,
  findOne: async (query) => problems.find(p => p.id === Number(query.id)),
  findById: async (id) => problems.find(p => p.id === Number(id))
};

module.exports = Problem;