/**
 * mongoose schema for accessing words Collection
 * @type {*|exports}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordsSchema = new Schema({
    score: String,
    comparative: String,
    delete: { type: Boolean, default: false },
    created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('words', WordsSchema);
