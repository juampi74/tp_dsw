import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { Cliente } from './cliente.entity.js';

const em = orm.em;

const findAll = async (req: Request, res: Response) => {
  try {
    const clientes = await em.find(
      Cliente,
      {},
      {
        populate: [
          'alquileres',
          'alquileres.vehiculo',
          'alquileres.vehiculo.sucursal',
          'alquileres.vehiculo.color',
          'alquileres.vehiculo.modelo',
          'alquileres.vehiculo.modelo.categoria',
          'alquileres.vehiculo.modelo.marca',
        ],
      }
    );
    res
      .status(200)
      .json({ message: 'Todos los clientes encontrados', data: clientes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const findOne = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const cliente = await em.findOneOrFail(
      Cliente,
      { id },
      {
        populate: [
          'alquileres',
          'alquileres.vehiculo',
          'alquileres.vehiculo.sucursal',
          'alquileres.vehiculo.color',
          'alquileres.vehiculo.modelo',
          'alquileres.vehiculo.modelo.categoria',
          'alquileres.vehiculo.modelo.marca',
        ],
      }
    );
    res.status(200).json({ message: 'Cliente encontrado', data: cliente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const cliente = em.create(Cliente, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Cliente creado', data: cliente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const cliente = em.getReference(Cliente, id);
    em.assign(cliente, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Cliente actualizado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const cliente = em.getReference(Cliente, id);
    await em.removeAndFlush(cliente);
    res.status(200).send({ message: 'Cliente eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { findAll, findOne, add, update, remove };
