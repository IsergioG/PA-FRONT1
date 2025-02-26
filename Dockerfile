# Dockerfile para el Canal 1
FROM node:20-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/quantum.frontend
# Crear el directorio de trabajo
WORKDIR /usr/src/app/quantum.frontend

# Copiar los archivos necesarios
COPY . .

# Instalar dependencias
RUN npm install

EXPOSE 10000

# Comando para ejecutar el canal
CMD [ "npm", "run", "dev"]