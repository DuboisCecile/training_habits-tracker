import {
  getHabits,
  getTodayHabits,
  addHabit,
  updateHabit,
} from '../habits.helper.js';

export default async function habitsRoute(fastify) {
  fastify.get('/', async (request, reply) => {
    try {
      const habits = await getHabits();
      return habits;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  fastify.get('/today', async (request, reply) => {
    try {
      const habits = await getTodayHabits();
      return habits;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  fastify.post('/', async (request, reply) => {
    const { body } = request;

    if (body.title === undefined) {
      return reply.code(400).send({ error: 'title is required' });
    }

    try {
      const newHabit = await addHabit(body.title);
      return newHabit;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });

  fastify.patch('/:id', async (request, reply) => {
    const { body } = request;

    if (body.done === undefined) {
      return reply.code(400).send({ error: 'done is required' });
    }

    const habitId = Number(request.params.id);

    if (!habitId || Number.isNaN(habitId)) {
      return reply
        .code(400)
        .send({ error: 'id is required and must be a number' });
    }

    if (typeof body.done !== 'boolean') {
      return reply.code(400).send({ error: 'done must be a boolean' });
    }

    try {
      const updatedHabit = await updateHabit(habitId, body.done);
      return updatedHabit;
    } catch (error) {
      return reply.code(400).send({ error: error.message });
    }
  });
}
