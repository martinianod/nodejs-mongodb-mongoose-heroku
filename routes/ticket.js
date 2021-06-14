const express = require('express')
const router = express.Router()
const TicketController = require('../controllers/ticket.controller');

router.get('/', TicketController.findAll);
router.get('/:id', TicketController.findOne);
router.post('/', TicketController.create)
router.put('/:id', TicketController.update);
router.delete('/:id', TicketController.delete);

module.exports = router