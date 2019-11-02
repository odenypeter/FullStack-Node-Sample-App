FROM node:12

# Create app directory
WORKDIR /usr/projects

# Install app dependencies
COPY package*.json ./

RUN npm install -g typescript 

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]