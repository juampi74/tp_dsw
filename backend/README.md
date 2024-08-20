# TP-3k02-Berli-Gilardoni-Godoy-Jaca-Marquez-BE-App

## Si se trabajará con el backend alojado en la nube:

1. No es necesario realizar ninguna acción en el backend.

2. Ver README.md del frontend.

## Si se trabajará con un backend ejecutado de forma local:

### Instalación de dependencias

1. Dentro de la carpeta 'backend', ejecutar el siguiente comando en consola:

```bash
   npm install
```

Al hacerlo, se creará una carpeta 'backend/node_modules' y un archivo 'backend/package-lock.json'.

### Pasos previos a la compilación y ejecución

1. Siguiendo el modelo del archivo 'backend/.env.template', crear un archivo 'backend/.env', especificando en el mismo el puerto donde se ejecutará el backend, y las credenciales de la conexión a la base de datos local.

2. Revisar el archivo 'backend/docker-compose.yml' y asegurarse que el puerto local especificado en el mismo esté disponible (no ocupado por otro proceso).
   => port: ${puerto_local}:3306.

3. Comprobar también que todas las variables de entorno que se especifican en 'backend/docker-compose.yml' estén definidas en su archivo 'backend/.env'.

4. Con el servicio de Docker ejecutándose de forma local, dentro de la carpeta 'backend', ejecutar el siguiente comando en consola para levantar el contenedor, en el que se creará la base de datos local:

```bash
  docker-compose up -d
```

Al hacerlo, se creará una carpeta 'backend/mysql', y, dentro de la misma, una carpeta 'alquilerVehiculos' vacía, en la que luego se almacenará la información de la base de datos local con el mismo nombre.

El nombre 'alquilerVehiculos' deberá ser definido en la variable de entorno 'MYSQL_DATABASE' y como última parte de 'MYSQL_PUBLIC_URL' en su archivo 'backend/.env'.

### Compilación y ejecución de la app

#### Compilación

1. Desde la carpeta 'backend', ejecutar el siguiente comando:

```bash
   npm run build
```

Al hacerlo, se creará una carpeta 'backend/dist'.

#### Ejecución

1. Descomentar lo indicado en los archivos 'backend/src/app.ts' y 'backend/src/shared/db/orm.ts'.

2. Desde la carpeta 'backend', ejecutar el siguiente comando:

```bash
   npm run dev
```

Al hacerlo, MikroORM se encargará de sincronizar el esquema de la base de datos (si cumplió con el paso 1), y quedará a disposición para realizar operaciones que sean solicitadas desde el frontend.
