FROM node:18-alpine

WORKDIR /app

RUN npm install -g @dillip285/mcp-terminal

EXPOSE 8201
CMD ["node", "--experimental-specifier-resolution=node", "$(npm bin)/mcp-terminal", "--allowed-paths", "/workspace/gnosta", "--port", "8201"]