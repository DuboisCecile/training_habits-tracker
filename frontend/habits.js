export async function getHabits(habitsDiv) {
  try {
    const response = await fetch('http://localhost:3000/habits/today', {
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
        'rounded',
        'px-5',
        'py-2.5',
        'text-white',
        `${habit.done ? 'bg-green-500' : 'bg-red-500'}`,
        'group',
        'hover:bg-gradient-to-r',
        `${habit.done ? 'hover:from-green-500' : 'hover:from-red-500'}`,
        `${habit.done ? 'hover:to-green-400' : 'hover:to-red-400'}`,
        'hover:ring-2',
        'hover:ring-offset-2',
        `${habit.done ? 'hover:ring-green-400' : 'hover:ring-red-400'}`,
        'transition-all',
        'ease-out',
        'duration-200',
      );
      habitBtn.innerHTML = `
        <div class="inline-block group-hover:translate-x-0.5 transition-all ease-out duration-200">${habit.title}</div>
        <div class="ml-6">
          <i class="fa-solid ${habit.done ? 'fa-circle-check' : 'fa-square-xmark'}"></i>
        </div>`;
      habitDiv.appendChild(habitBtn);

      habitBtn.addEventListener('click', async (e) => {
        const habitId = e.currentTarget.id;

        const patchResponse = await fetch(
          `http://localhost:3000/habits/${habitId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              done: habit.done === false,
            }),
          },
        );
        await patchResponse.json();
        await getHabits(habitsDiv);
      });

      habitDiv.appendChild(habitBtn);
    });
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  }

  return null;
}

export async function createHabit(habitsDiv, title) {
  const postResponse = await fetch(`http://localhost:3000/habits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  await postResponse.json();
  await getHabits(habitsDiv);
}
