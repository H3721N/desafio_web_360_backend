# Desafio Web 360 Backend

Backend sobre una tienda

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Notas

Es necesario que los usuarios tengan el rol \`operador\` para realizar las acciones de creación y edicion de registros
para la mayoria de entidades.

## Descripción

Este proyecto es el backend de una tienda en línea, desarrollado con Node.js y Express. Proporciona una API para gestionar usuarios, roles y otros recursos necesarios para el funcionamiento de la tienda.

## Tecnologías

- Node.js
- Express
- Sequelize
- MySQL

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/desafio_web_360_backend.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd desafio_web_360_backend
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_tu_base_de_datos
    JWT_SECRET=tu_secreto_jwt
    ```

## Uso

1. Inicia el servidor:
    ```bash
    npm start
    ```
2. La API estará disponible en `http://localhost:3000`.

## Endpoints

### Usuarios

- `POST /usuario`: Crear un nuevo usuario
- `PUT /usuario/:id`: Actualizar un usuario existente

### Roles

- `GET /rol`: Obtener todos los roles
- `GET /rol/:id`: Obtener un rol por ID
- `POST /rol`: Crear un nuevo rol
- `PUT /rol/:id`: Actualizar un rol existente

## Contribución

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.