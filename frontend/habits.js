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
        'relative',
        'rounded',
        'px-5',
        'py-2.5',
        'overflow-hidden',
        'text-white',
        'group',
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

      console.log(habitBtn.classList);
      const toto = '';

      habitBtn.innerHTML = `
        <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40"></span>
        <span >${habit.title}</span>
        <span class="ml-6">
          <i class="fa-solid ${habit.done ? 'fa-circle-check' : 'fa-square-xmark'}"></i>
        </span>`;
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
