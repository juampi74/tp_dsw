import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { Marca } from './marca.entity.js';

const em = orm.em;

const findAll = async (req: Request, res: Response) => {
  try {
    const marcas = await em.find(
      Marca,
      {},
      {
        populate: [
          'modelos',
          'modelos.categoria',
          'modelos.vehiculos',
          'modelos.vehiculos.color',
          'modelos.vehiculos.sucursal',
          'modelos.vehiculos.alquileres',
          'modelos.vehiculos.alquileres.cliente',
        ],
      }
    );
    res
      .status(200)
      .json({ message: 'Todas las marcas encontradas', data: marcas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const findOne = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const marca = await em.findOneOrFail(
      Marca,
      { id },
      {
        populate: [
          'modelos',
          'modelos.categoria',
          'modelos.vehiculos',
          'modelos.vehiculos.color',
          'modelos.vehiculos.sucursal',
          'modelos.vehiculos.alquileres',
          'modelos.vehiculos.alquileres.cliente',
        ],
      }
    );
    res.status(200).json({ message: 'Marca encontrada', data: marca });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const marca = em.create(Marca, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Marca creada', data: marca });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const marca = em.getReference(Marca, id);
    em.assign(marca, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Marca actualizada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const marca = em.getReference(Marca, id);
    await em.removeAndFlush(marca);
    res.status(200).send({ message: 'Marca eliminada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { findAll, findOne, add, update, remove };
