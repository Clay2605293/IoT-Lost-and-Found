1. Clonar el repositorio del proyecto

Primero, el usuario debe clonar el repositorio de GitHub (si es que ya está alojado allí) en su máquina local:

bash

git clone <URL-del-repositorio>
cd <nombre-del-repositorio>

2. Configuración del Backend (Node.js con Express)
a) Ir a la carpeta del servidor

bash

cd server

b) Instalar Node.js y NPM (si no están instalados)

Si no tiene Node.js y npm instalados, deben hacerlo. Aquí están los comandos para Ubuntu/Debian:

bash

sudo apt update
sudo apt install nodejs npm

c) Instalar dependencias del backend

Una vez dentro de la carpeta del servidor, instalar las dependencias necesarias que se definen en el archivo package.json:

bash

npm install

d) Variables de entorno

El usuario también debe asegurarse de configurar las variables necesarias, como las credenciales de MySQL. En el archivo server.js, deben configurar la conexión a la base de datos correctamente:

javascript

const db = mysql.createConnection({
  host: '127.0.0.1', // Cambiar si se está usando otra IP
  user: 'root',       // Usuario de MySQL
  password: 'SolSna260593',  // Contraseña de MySQL
  database: 'test'    // Nombre de la base de datos
});

e) Iniciar el servidor

Finalmente, puede iniciar el servidor con:

bash

node server.js

Esto iniciará el servidor en http://localhost:3001.
3. Configuración de la base de datos (MySQL/MariaDB)

El usuario también debe tener instalado MySQL o MariaDB para manejar la base de datos.
a) Instalar MySQL o MariaDB

Para instalar MySQL:

bash

sudo apt install mysql-server

Para MariaDB:

bash

sudo apt install mariadb-server

b) Crear la base de datos y las tablas

El usuario deberá ejecutar las siguientes consultas SQL para crear la base de datos y las tablas necesarias:

sql

CREATE DATABASE test;

USE test;

CREATE TABLE `Users` (
  `Matricula` varchar(9) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Points` INT DEFAULT 0,
  PRIMARY KEY (`Matricula`)
);

CREATE TABLE Objects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Matricula VARCHAR(9) NOT NULL,
  Status VARCHAR(20) NOT NULL,
  Foto VARCHAR(255),
  FOREIGN KEY (Matricula) REFERENCES Users(Matricula) ON DELETE CASCADE
);

CREATE TABLE Reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idObject INT NOT NULL,
  GPS VARCHAR(50),
  Status VARCHAR(20),
  Building VARCHAR(50),
  Classroom VARCHAR(50),
  FOREIGN KEY (idObject) REFERENCES Objects(id) ON DELETE CASCADE
);

4. Configuración del Frontend (React)
a) Ir a la carpeta del frontend

bash

cd ../client

b) Instalar las dependencias del frontend

Instalar las dependencias necesarias que están definidas en el archivo package.json del frontend:

bash

npm install

c) Iniciar el servidor de desarrollo de React

Para iniciar el servidor de React:

bash

npm start

Esto iniciará el servidor de desarrollo en http://localhost:3000.
5. Resumen de librerías que se instalarán:
Backend (Node.js con Express):

json

{
  "dependencies": {
    "axios": "^1.7.7",
    "cors": "^2.8.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.11.3",
    "bcrypt": "^5.0.1"
  }
}

Frontend (React):

json

{
  "dependencies": {
    "axios": "^1.7.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.14.1"
  }
}

6. Verificación final

    Backend: Asegurarse de que el servidor se está ejecutando en http://localhost:3001 y se conecta correctamente a la base de datos.
    Frontend: El frontend de React debe ejecutarse en http://localhost:3000 y conectarse al backend.

Posibles problemas:

    Errores de CORS: Asegurarse de que las configuraciones de CORS están bien en server.js.
    Errores de conexión a la base de datos: Verificar que las credenciales de MySQL sean correctas y que el servicio de MySQL esté corriendo.
