/**
 * Created by matt on 03/01/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    //_id: Number,
    name:  String,
    email: String,
    mentor: Boolean,
    mentee: Boolean
});

var relationshipSchema = new Schema({
    mentor: { type: Schema.Types.ObjectId, ref: 'Person' },
    mentee: { type: Schema.Types.ObjectId, ref: 'Person' }
});
var personModel = mongoose.model('Person', personSchema);
var relationshipModel = mongoose.model('Relationship', relationshipSchema);

module.exports = {personModel, relationshipModel};