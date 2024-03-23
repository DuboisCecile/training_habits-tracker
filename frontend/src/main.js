import { createHabit, getTodayHabits, getHabitsHistory } from './habits';

const main = async () => {
  const habitsDiv = document.querySelector('#habits');
  await getTodayHabits(habitsDiv);

  const form = document.querySelector('#new-habit-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    await createHabit(habitsDiv, title);
  });

  const addButton = document.querySelector('#new-habit');
  addButton.addEventListener('click', () => {
    form.classList.toggle('hidden');
  });

  const historyButton = document.querySelector('#open-history');
  const historyModal = document.querySelector('#history');
  const closeHistoryButton = document.querySelector('#close-history');
  const habitsHistoryDiv = document.querySelector('#history-table');

  historyButton.addEventListener('click', async () => {
    const { classList } = historyModal;
    const needToLoadData = [...classList].includes('hidden'); // modal was hidden --> we need to load the data

    if (needToLoadData) {
      await getHabitsHistory(habitsHistoryDiv);
    }
    historyModal.classList.toggle('hidden');
  });

  closeHistoryButton.addEventListener('click', () => {
    historyModal.classList.add('hidden');
  });

  document.addEventListener('click', (event) => {
    if (event.target.id === 'background' && historyModal) {
      historyModal.classList.add('hidden');
    }
  });
};

main();
