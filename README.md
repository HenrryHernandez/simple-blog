# Requerimientos

- Al menos la version 18 de node (si no funciona, provar con la 20)
- Docker

# Instalar la base de datos

Dentro del proyecto hay un archivo llamado "docker-compose.yml." Estando en la misma ruta que el archivo, ejecutar el comando:

```
docker compose up -d
```

Este comando creará un contenedor con lo necesario para la configuración de la base de datos.

# Configurar proyecto

1. Instalar dependencias con comando: **npm install**
2. Revisar las variables de entorno. Estas son necesarias para poder conectar a la base de datos. (En este caso por ser un proyecto demo, las incluí ya en el mismo repositorio y estan listas ya para usarse tal cual.)
3. Para crear tablas en la base de datos, ejecutar el comando: **npx prisma migrate dev --name dev**

# Correr el proyecto opcion 1 (sin funcionalidad offline)

1. Ejecutar comando: **npm run dev**
2. Por default el proyecto corre en la url: http://localhost:3000. Dirigirse ahí.
3. El proyecto debería de estar ya funcionando.

# Correr el proyecto opcion 2 (con funcionalidad offline)

1. Ir al root layout que se encuentra en el path: /src/app/layout.tsx y descomentar la linea 31. Esto hara que el Service Worker se configure.
2. Correr el comando: **npm run build**
3. Correr el comando: **npm run start**
4. Por default el proyecto corre en la url: http://localhost:3000. Dirigirse ahí.
5. El proyecto debería de estar ya funcionando.

# Notas

- La razon por la que doy dos opciones para ejecutar el proyecto es que al configurar el Service Worker, este hace que la aplicación funcione "raro." Entonces si solo se desea ver la aplicación normal, podemos seguir la opción uno.
- En producción, el archivo ".env" no se debe de ponder en el proyecto, estoy conciente de ello, solo que aqui, al ser una demostración, lo adjunté para fines prácticos.
- El proyecto ya toma las variables de entorno necesarias, pero también adjunté otras variables de entorno que no son necesarias en el proyecto, pero que les servirán para que puedan conectarse a la base de datos usando alguna otra herramienta como Workbench o TablePlus.
