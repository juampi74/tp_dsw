# TP-3k02-Berli-Gilardoni-Godoy-Jaca-Marquez-FE-App

## Si se trabajará con el frontend alojado en la nube:

1. No es necesario realizar ninguna acción en el frontend.

2. Ver README.md en el directorio raíz.

## Si se trabajará con el frontend ejecutado de forma local:

## Instalación de dependencias

1. Dentro de la carpeta 'frontend', ejecutar el siguiente comando en consola:

```bash
   npm install
```

Al hacerlo, se creará una carpeta 'frontend/node_modules' y un archivo 'frontend/package-lock.json'.

## Compilación y ejecución de la app

### Compilación

1. Desde la carpeta 'frontend', ejecutar el siguiente comando:

```bash
   npm run build
```

Al hacerlo, se crearán las carpetas 'frontend/.angular/...' y 'backend/dist'.

### Ejecución

#### Si se trabajará con el backend alojado en la nube:

1. Descomentar en 'frontend/src/environments/environment.ts' la variable apiUrl que hace referencia al servidor alojado en la nube, y comentar, si no estuviese así, aquella que se refiere al servidor local.

2. Desde la carpeta 'frontend', ejecutar el siguiente comando:

```bash
   npm run start
```

Al hacerlo, se levantará el servidor local 4200 (propio de Angular), y se podrá utilizar la aplicación en 'http://localhost:4200/', obteniendo y guardando la información en la base de datos alojada en la nube.

#### Si se trabajará con el backend ejecutado de forma local:

1. Tener el backend en ejecución de forma local para obtener y guardar la información deseada (Ver '../backend/README.md).

2. Descomentar en 'frontend/src/environments/environment.ts' la variable apiUrl que hace referencia al servidor local, detallando en la misma el puerto donde se está ejecutando el backend localmente.
   (Tener en cuenta que este puerto es definido en el archivo '../backend/.env').

3. En el mismo archivo 'frontend/src/environments/environment.ts', comentar la variable apiUrl que se refiere al servidor alojado en la nube, si no estuviese así.

4. Desde la carpeta 'frontend', ejecutar el siguiente comando:

```bash
   npm run start
```

Al hacerlo, se levantará el servidor local 4200 (propio de Angular), y se podrá utilizar la aplicación en 'http://localhost:4200/', obteniendo y guardando la información en la base de datos alojada localmente.
