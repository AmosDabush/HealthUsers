# pull official base image
FROM node:18

# set working directory
RUN mkdir /app && chown node:node /app
WORKDIR /app

# install app dependencies
USER node
COPY --chown=node:node package.json ./
RUN npm install

# add app
COPY --chown=node:node . .

# start app
# ENV CHOKIDAR_USEPOLLING=true
# EXPOSE 80

CMD ["npm", "start"]

