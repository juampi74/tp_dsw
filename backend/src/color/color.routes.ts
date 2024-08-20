import express, { Request, Response, NextFunction } from 'express';
import { findAll, findOne, add, update, remove } from './color.controler.js';

const router = express.Router();

const sanitizedInput = (req: Request, res: Response, next: NextFunction) => {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    vehiculos: req.body.vehiculos,
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
