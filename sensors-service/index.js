import fastify from 'fastify';
import fastifyMongo from '@fastify/mongodb';

const app = fastify({ logger: true });

// Connexion à MongoDB
app.register(fastifyMongo, {
  url: 'mongodb://localhost:27017/ecosync',
});

// Endpoint pour recevoir les données des capteurs
app.post('/sensors/data', async (request, reply) => {
  const { sensorId, location, trashLevel } = request.body;
  const sensors = app.mongo.db.collection('sensors');
  await sensors.insertOne({ sensorId, location, trashLevel, timestamp: new Date() });
  return { status: 'Données reçues' };
});

app.listen({ port: 3000 }, () => {
  console.log('Service Capteurs IoT démarré 🛰️');
});