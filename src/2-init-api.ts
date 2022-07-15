import fastify from 'fastify';
import jsonData from '../config/api-data.json';

const server = fastify();
const endpoint = '/api';

server.get(endpoint, async (request, reply) => {
  return jsonData;
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Access endpoint at ${address}${endpoint}`);
});
