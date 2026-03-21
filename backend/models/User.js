// Mock User model for a backend without database requirement
const users = []; // In-memory storage

class User {
  constructor(data) {
    Object.assign(this, data);
    if (!this.id && !this._id) this.id = Date.now().toString();
    this.solvedProblems = this.solvedProblems || [];
    this.bookmarks = this.bookmarks || [];
    this.notes = this.notes || [];
  }

  static async findOne(query) {
    const found = users.find(u => u.email === query.email);
    return found ? new User(found) : null;
  }

  static async findById(id) {
    const found = users.find(u => u.id === id || u._id === id);
    return found ? new User(found) : null;
  }

  async save() {
    const index = users.findIndex(u => u.email === this.email);
    if (index !== -1) {
      users[index] = { ...this };
    } else {
      users.push({ ...this });
    }
    return this;
  }

  static async findByIdAndUpdate(id, update) {
    const user = await User.findById(id);
    if (user) {
      Object.assign(user, update);
      return user.save();
    }
    return null;
  }
}

module.exports = User;