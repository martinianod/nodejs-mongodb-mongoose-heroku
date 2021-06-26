const User = require('../models/user');
const Ticket = require('../models/ticket');
const Localidad = require('../models/localidad');

// Create user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a user
    const user = {
        name: req.body.name,
        mail: req.body.mail,
    };

    // Save user in the database
    User.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all tickets from the database.
exports.findAll = (req, res) => {

    Ticket.find({}).then(data => {
        console.log(data)
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// quien atiende mas tickets
exports.quienAtiendeMasTickets = (req, res) => {

    Ticket.aggregate([
        { $unwind: "$empleado_asignado" },
        { $group: { _id: "$empleado_asignado.nro_empleado", nro_empleado: { "$first": "$empleado_asignado.nro_empleado" }, nombre: { "$first": "$empleado_asignado.nombre" }, apellido: { "$first": "$empleado_asignado.apellido" }, tickets_atendidos: { $sum: 1 } } },
        { $group: { _id: "$tickets_atendidos", empleados_con_mas_tickets_atendidos: { $push: { nro_empleado: "$nro_empleado", tickets_atendidos: "$tickets_atendidos" } } } },
        { $sort: { _id: -1 } },
        { $limit: 1 },
        { $unwind: "$empleados_con_mas_tickets_atendidos" },
        { $project: { _id: 0 } }
    ]).then(data => {
        console.log(data)
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// quien genera mas tickets
exports.quienGeneraMasTickets = (req, res) => {

    Ticket.aggregate([
        { $group: { _id: "$cliente.nro_cliente", nombre: { "$first": "$cliente.nombre" }, apellido: { "$first": "$cliente.apellido" }, dni: { "$first": "$cliente.dni" }, cant_tickets_generados: { $sum: 1 } } },
        { $group: { _id: "$cant_tickets_generados", clientes_con_mas_tickets_generados: { $push: { nro_cliente: "$_id", nombre: "$nombre", apellido: "$apellido", dni: "$dni", cant_tickets_generados: "$cant_tickets_generados" } } } },
        { $sort: { _id: -1 } },
        { $limit: 1 },
        { $unwind: "$clientes_con_mas_tickets_generados" },
        { $project: { _id: 0 } }
    ]).then(data => {
        console.log(data)
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};


// quien genera mas tickets
exports.quienTicketSinResolver = (req, res) => {

    Ticket.find({ estado_actual: { $ne: "finalizado" } }).then(data => {
        console.log(data)
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// que desperfecto ocurre
exports.queDesperfectoOcurre = (req, res) => {

    Ticket.aggregate([
        { $match: { motivo: { $eq: "desperfecto" } } },
        { $project: { _id: 0, nro_ticket: 1, motivo: 1, descripcion: 1 } }
    ]).then(data => {
        console.log(data)
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};


// cada cuanto ocurre un desperfecto
exports.cadaCuantoOcurreUnDesperfecto = (req, res) => {

    Ticket.aggregate([
        { $match: { motivo: { $eq: "desperfecto" } } },
        { $project: { _id: 0, nro_ticket: 1, motivo: 1, fecha_generado: 1 } },
        { $sort: { fecha_generado: 1 } }
    ]).then(data => {
        console.log(data)
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

//desperfectos por zona avellaneda
exports.desperfectoPorZonaAvellaneda = (req, res) => {

    Ticket.aggregate([
        { $match: { motivo: { $eq: "desperfecto" } } },
        { $project: { _id: 0, nro_ticket: 1, motivo: 1, fecha_generado: 1 } },
        { $sort: { fecha_generado: 1 } }
    ]).then(data => {
        console.log(data)
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

//desperfectos por zona flores
exports.desperfectoPorZonaFlores = (req, res) => {

    Localidad.findOne({ localidad: "flores" }).then(localidad => {
        Ticket.find({ "cliente.direccion.geometry": { $geoWithin: { $geometry: localidad.geometry } } }).then(data => {
            console.log(data)
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    });
};


//desperfectos por zona avellaneda
exports.desperfectoPorZonaAvellaneda = (req, res) => {

    Localidad.findOne({ localidad: "avellaneda" }).then(localidad => {
        Ticket.find({ "cliente.direccion.geometry": { $geoWithin: { $geometry: localidad.geometry } } }).then(data => {
            console.log(data)
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    });
};
















































// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found user with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving user with id=" + id });
        });
};

// Update a user by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update user with id=${id}. Maybe user was not found!`
                });
            } else res.send({ message: "user was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${id}.  Maybe user was not found!`
                });
            } else {
                res.send({
                    message: "user was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};
