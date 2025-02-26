# Dockerfile para el Canal 1
FROM  node:20-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/corte-backend
# Crear el directorio de trabajo
WORKDIR /usr/src/app/corte-backend

# Copiar los archivos necesarios
COPY . .

# Instalar dependencias
RUN npm install
EXPOSE 3000

# Comando para ejecutar el canal
CMD ["npm", "run","start:dev"]