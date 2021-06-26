/**
 * Localidad
 *
 * @module      :: Model
 * @description :: Represent data model for the Localidad
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
 
 var Localidad = new Schema({
 
     localidad: {
         type: String,
         require: true
     },
     codigoPostal: {
         type: Number,
         require: true
     },
     geometry:{
         
     } 
 } , { collection: 'localidades' });
 
 module.exports = mongoose.model('Localidad', Localidad);