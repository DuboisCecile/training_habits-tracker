import { createHabit, getHabits } from '../habits';

const main = async () => {
  const habitsDiv = document.querySelector('#habits');
  await getHabits(habitsDiv);

  const addButton = document.querySelector('#newHabit');
  const form = document.querySelector('#newHabitForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    await createHabit(habitsDiv, title);
  });

  addButton.addEventListener('click', () => {
    form.classList.toggle('hidden');
  });
};

main();
