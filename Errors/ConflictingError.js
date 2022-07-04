class ConflictingError extends Error {
  constructor(message) {
    super(message);
    this.code = 409;
  }
}
module.exports = { ConflictingError };
