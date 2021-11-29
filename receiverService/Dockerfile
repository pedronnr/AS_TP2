FROM node:17-alpine3.12
WORKDIR /usr/src/receiverservice

# Copia packages json
COPY package*.json ./

# Copia ficheiros para raiz
COPY index.js ./

# Efetua instalacao dependencias apenas em producao
RUN npm i --only=production

# Executa o script start definido em package
CMD npm start

# Build da imagem -t Tag --file Ficheiro Destino
# docker build -t pnnr/21.11:v1 --file Dockerfile .