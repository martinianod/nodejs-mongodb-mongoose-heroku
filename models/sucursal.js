/**
 * Localidad
 *
 * @module      :: Model
 * @description :: Represent data model for the Sucursal
 */

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
  
  
  var Sucursal = new Schema({
  
      sucursal: {
          type: String,
          require: true
      },
      direccion: {
          type: Number,
          require: true
      },
      geometry:{
          
      } 
  } , { collection: 'sucursales' });
  
  module.exports = mongoose.model('Sucursal', Sucursal);