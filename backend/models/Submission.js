// Mock Submission model for a backend without MongoDB
const submissions = [];

class Submission {
  constructor(data) {
    Object.assign(this, data);
    this.timestamp = this.timestamp || new Date();
    this.id = this.id || Date.now().toString();
  }

  static async find(query) {
    let results = submissions;
    if (query && query.userId) {
      results = results.filter(s => s.userId === query.userId);
    }
    return {
      sort: () => results.sort((a, b) => b.timestamp - a.timestamp)
    };
  }

  async save() {
    submissions.push({ ...this });
    return this;
  }
}

module.exports = Submission;
