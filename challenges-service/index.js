import fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';

const app = fastify({ logger: true });

// Connexion à PostgreSQL
app.register(fastifyPostgres, {
  connectionString: 'postgres://user:password@localhost:5432/ecosync',
});

// Endpoint pour créer un défi
app.post('/challenges', async (request, reply) => {
  const { title, description, points } = request.body;
  const { rows } = await app.pg.query(
    'INSERT INTO challenges (title, description, points) VALUES ($1, $2, $3) RETURNING *',
    [title, description, points]
  );
  return rows[0];
});

app.listen({ port: 3001 }, () => {
  console.log('Service Défis démarré 🎯');
});