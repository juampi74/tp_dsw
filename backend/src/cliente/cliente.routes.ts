import express, { Request, Response, NextFunction } from 'express';
import { findAll, findOne, add, update, remove } from './cliente.controler.js';

const router = express.Router();

const sanitizedInput = (req: Request, res: Response, next: NextFunction) => {
  req.body.sanitizedInput = {
    tipoDoc: req.body.tipoDoc,
    nroDoc: req.body.nroDoc,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fechaNacimiento: req.body.fechaNacimiento,
    mail: req.body.mail,
    domicilio: req.body.domicilio,
    telefono: req.body.telefono,
    nacionalidad: req.body.nacionalidad,
    alquileres: req.body.alquileres,
  };
  // Más validaciones
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
};

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', sanitizedInput, add);
router.put('/:id', sanitizedInput, update);
router.patch('/:id', sanitizedInput, update);
router.delete('/:id', remove);

export default router;
