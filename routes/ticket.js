const express = require('express')
const router = express.Router()
const TicketController = require('../controllers/ticket.controller');

router.get('/', TicketController.findAll);
//router.get('/:id', TicketController.findOne);
router.get('/quien-atiende-mas-tickets', TicketController.quienAtiendeMasTickets);
router.get('/quien-genera-mas-tickets', TicketController.quienGeneraMasTickets);
router.get('/tickets-sin-resolver', TicketController.quienTicketSinResolver);
router.get('/que-desperfecto-ocurre', TicketController.queDesperfectoOcurre);
router.get('/cada-cuanto-ocurre-desperfecto', TicketController.cadaCuantoOcurreUnDesperfecto);
router.get('/desperfectos-por-zona-avellaneda', TicketController.desperfectoPorZonaAvellaneda);
router.get('/desperfectos-por-zona-flores', TicketController.desperfectoPorZonaFlores);
router.get('/clientes-cercanos-zona-flores', TicketController.clientesCercanosZonaFlores);
router.get('/clientes-cercanos-zona-avellaneda', TicketController.clientesCercanosZonaAvellaneda);

//router.post('/', TicketController.create)
//router.put('/:id', TicketController.update);
//router.delete('/:id', TicketController.delete);

module.exports = router