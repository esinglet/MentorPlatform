/**
 * Created by matt on 03/01/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name:  String,
    email: String,
    mentor: Boolean,
    mentee: Boolean
});

module.exports = mongoose.model('Person', personSchema);