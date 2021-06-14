/**
 * Ticket
 *
 * @module      :: Model
 * @description :: Represent data model for the Ticket
 */

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 
 
 var Ticket = new Schema({
 
     motivo: {
         type: String,
         require: true
     },
     estado_actual: {
         type: String,
         require: true
     }
 });
 
 module.exports = mongoose.model('Ticket', Ticket);