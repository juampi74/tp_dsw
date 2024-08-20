import express, { Request, Response, NextFunction } from 'express';

import 'reflect-metadata';
import { orm } from './shared/db/orm.js';

// <<Descomentar si se trabaja en un entorno local => localhost>>

// import { syncSchema } from './shared/db/orm.js';

import { RequestContext } from '@mikro-orm/core';
import alquilerRoutes from './alquiler/alquiler.routes.js';
import categoriaRoutes from './categoria/categoria.routes.js';
import clienteRoutes from './cliente/cliente.routes.js';
import colorRoutes from './color/color.routes.js';
import marcaRoutes from './marca/marca.routes.js';
import modeloRoutes from './modelo/modelo.routes.js';
import sucursalRoutes from './sucursal/sucursal.routes.js';
import vehiculoRoutes from './vehiculo/vehiculo.routes.js';

const app = express();
app.use(express.json());

// luego de los middlewares base
app.use((req: Request, res: Response, next: NextFunction) => {
  /*
  Cuando se realiza una solicitud a, por ejemplo, http://localhost:3000/api/vehiculos,
  desde la aplicacion Angular (que está ejecutandose en el puerto 4200), la API no está
  configurada para permitir solicitudes CORS (forma de permitir que un sitio web acceda
  a recursos de otro sitio web desde un navegador), por lo que obtiene HttpErrorResponse
  con un estado de 0 y un error desconocido. Al agregar los siguientes encabezados, será
  posible realizar solicitudes desde cualquier origen.
  */

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Accept-Language, Accept-Encoding'
  );
  RequestContext.create(orm.em, next);
});
// antes de las rutas y middlewares de negocio

app.use('/api/alquileres', alquilerRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/colores', colorRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/modelos', modeloRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/vehiculos', vehiculoRoutes);

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found!' });
});

// <<Descomentar si se trabaja en un entorno local => localhost>>

// await syncSchema(); // never in production

export default app;
