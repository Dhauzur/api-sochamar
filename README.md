# Api sochamar cl

###### Administracion de datos de sochamar

## Instalación

###### Por favor instale node js, npm y asegurese de tener instalado mongodb y corriendo antes de comenzar. Tambien debe agregar las variables de entorno para desarrollo o produccion necesarias.

### Para desarrollo
```bash
npm install
```

```bash
npm run dev
```

### Para produccion
```bash
npm run install
```
```bash
npm run build
```
```bash
npm run start
```

### Enviroment
###### Para produccion agregue un archivo llamado ".env", si no lo encuentra webpack utilizara por defecto ".env.defaults"
```
PORT=*******
NODE_ENV=*******
URLDB=*******
API_URL=*******
FRONTEND_URL=*******
JWT_SECRET=*******
JWT_ALGORITHM=*******
JWT_EXPIRATION=*******
PASSWORD_RECOVERY_JWT_EXPIRATION=*******
```
## License
[ISC](https://choosealicense.com/licenses/isc/)