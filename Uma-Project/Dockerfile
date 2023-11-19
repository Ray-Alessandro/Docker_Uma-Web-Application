# Usa una imagen de Node.js como base
FROM node:18 as build

# Crea el directorio de la aplicación
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos al contenedor
COPY . .

# Compila la aplicación Angular
RUN npm run build --prod

# ------------------------------------------------------
# Fase de producción
# ------------------------------------------------------
FROM nginx:alpine

# Copia los archivos de construcción desde la fase de compilación
COPY --from=build /usr/src/app/dist/uma-project /usr/share/nginx/html

# Exponer el puerto 80 (puerto del servidor web Nginx)
EXPOSE 80

# Comando predeterminado para iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]