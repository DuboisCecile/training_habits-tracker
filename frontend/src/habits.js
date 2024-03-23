const BASE_URL = 'http://localhost:3000';

export async function getTodayHabits(habitsDiv) {
  try {
    const response = await fetch(`${BASE_URL}/habits/today`, {
      method: 'GET',
    });
    const data = await response.json();

    while (habitsDiv.firstChild) {
      habitsDiv.firstChild.remove();
    }

    data.forEach((habit) => {
      const habitDiv = document.createElement('div');
      habitDiv.classList.add('flex', 'justify-center', 'mb-6');
      habitsDiv.appendChild(habitDiv);

      const habitBtn = document.createElement('button');
      habitBtn.id = habit.id;

      habitBtn.classList.add(
        'flex',
        'justify-center',
        'relative',
        'rounded',
        'px-5',
        'py-2.5',
        'overflow-hidden',
        'text-white',
        'group',
        'shadow-2xl',
        `${habit.done ? 'bg-green-500' : 'bg-red-500'}`,
        'hover:bg-gradient-to-r',
        `hover:${habit.done ? 'from-green-500' : 'from-red-500'}`,
        `hover:${habit.done ? 'to-green-400' : 'to-red-400'}`,
        'hover:ring-2',
        'hover:ring-offset-2',
        `hover:${habit.done ? 'ring-green-400' : 'ring-red-400'}`,
        'transition-all',
        'ease-out',
        'duration-200',
      );

      habitBtn.innerHTML = `
        <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40"></span>
        <span >${habit.title}</span>
        <span class="ml-6">
          <i class="fa-solid ${habit.done ? 'fa-circle-check' : 'fa-square-xmark'}"></i>
        </span>`;
      habitDiv.appendChild(habitBtn);

      habitBtn.addEventListener('click', async (e) => {
        const habitId = e.currentTarget.id;

        const patchResponse = await fetch(`${BASE_URL}/habits/${habitId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            done: habit.done === false,
          }),
        });
        await patchResponse.json();
        await getTodayHabits(habitsDiv);
      });

      habitDiv.appendChild(habitBtn);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  }
}

export async function getHabitsHistory(habitsHistoryDiv) {
  try {
    const response = await fetch(`${BASE_URL}/habits`, {
      method: 'GET',
    });
    const data = await response.json();

    const allRecordedDates = [
      ...new Set(
        data.flatMap((habit) =>
          Object.keys(habit.daysDone).map((date) => new Date(date)),
        ),
      ),
    ];

    const minRecordedDate = new Date(Math.min(...allRecordedDates))
      .toISOString()
      .split('T')[0];

    const allDates = {};
    const tempDate = new Date(minRecordedDate);

    while (new Date(tempDate) <= new Date()) {
      const habitsTrue = data.filter(
        (habit) =>
          habit.daysDone[new Date(tempDate).toISOString().split('T')[0]] ===
          true,
      );
      allDates[new Date(tempDate).toISOString().split('T')[0]] = habitsTrue;
      tempDate.setDate(tempDate.getDate() + 1);
    }

    while (habitsHistoryDiv.firstChild) {
      habitsHistoryDiv.firstChild.remove();
    }

    const historyTable = document.createElement('table');
    habitsHistoryDiv.appendChild(historyTable);
    historyTable.classList.add('border-separate', 'border-spacing-0');
    const historyTableHead = document.createElement('thead');
    historyTable.appendChild(historyTableHead);
    const historyTableBody = document.createElement('tbody');
    historyTable.appendChild(historyTableBody);

    // Ligne d'entête du tableau
    const historyTableHeadRow = document.createElement('tr');
    historyTableHeadRow.classList.add('text-sm', 'whitespace-nowrap');
    historyTableHead.appendChild(historyTableHeadRow);
    const titleHeader = document.createElement('th');
    titleHeader.classList.add(
      'border',
      'px-4',
      'py-1',
      'sticky',
      'left-0',
      'bg-white',
      'z-50',
    );
    titleHeader.innerText = 'Titre';
    historyTableHeadRow.appendChild(titleHeader);

    Object.keys(allDates).forEach((date) => {
      const dateHeader = document.createElement('th');
      dateHeader.classList.add('border', 'px-2', 'py-1');
      dateHeader.innerText = date;
      historyTableHeadRow.appendChild(dateHeader);
    });

    // Lignes du tableau = tâches
    data.forEach((habit) => {
      const habitRow = document.createElement('tr');
      historyTableBody.appendChild(habitRow);

      // Cellule titre
      const habitTitle = document.createElement('td');
      habitTitle.classList.add(
        'border',
        'px-4',
        'py-1',
        'sticky',
        'left-0',
        'bg-white',
      );
      habitTitle.innerText = habit.title;
      habitRow.appendChild(habitTitle);

      // Cellules 'done' pour chaque date
      Object.keys(allDates).forEach((date) => {
        const habitCell = document.createElement('td');
        habitCell.classList.add('border', 'py-1', 'text-center');
        habitCell.innerText = allDates[date].find((hab) => hab.id === habit.id)
          ? '✅'
          : '❌';
        habitRow.appendChild(habitCell);
      });
    });
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  }

  return null;
}
export async function createHabit(habitsDiv, title) {
  const postResponse = await fetch(`${BASE_URL}/habits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  await postResponse.json();
  await getTodayHabits(habitsDiv);
}
