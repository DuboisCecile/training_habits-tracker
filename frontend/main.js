const main = async () => {
    const habitsDiv = document.querySelector('#habits');

    async function getHabits() {
        try {
            const response = await fetch('http://localhost:3000/habits/today', {
                method: 'GET',
            });
            const data = await response.json();
            console.log({ data });
            while (habitsDiv.firstChild) {
                habitsDiv.firstChild.remove();
            }

            data.forEach((habit) => {
                const habitDiv = document.createElement('div');
                habitDiv.classList.add('flex', 'justify-center', 'mb-6');
                habitsDiv.appendChild(habitDiv);

                const habitBtn = document.createElement('button');
                habitBtn.id = habit.id;
                console.log(habitBtn.id);
                if (habit.done) {
                    habitBtn.classList.add(
                        'flex',
                        'justify-center',
                        'rounded',
                        'px-5',
                        'py-2.5',
                        'text-white',
                        'bg-green-500',
                        'group',
                        'hover:bg-gradient-to-r',
                        'hover:from-green-500',
                        'hover:to-green-400',
                        'hover:ring-2',
                        'hover:ring-offset-2',
                        'hover:ring-green-400',
                        'transition-all',
                        'ease-out',
                        'duration-200'
                    );
                    habitBtn.innerHTML = `
                        <div class="inline-block group-hover:translate-x-0.5 transition-all ease-out duration-200">${habit.title}</div>
                        <div class="ml-6"><i class="fa-solid fa-circle-check"></i></div>
`;
                } else {
                    habitBtn.classList.add(
                        'flex',
                        'justify-center',
                        'rounded',
                        'px-5',
                        'py-2.5',
                        'text-white',
                        'bg-red-500',
                        'group',
                        'hover:bg-gradient-to-r',
                        'hover:from-red-500',
                        'hover:to-red-400',
                        'hover:ring-2',
                        'hover:ring-offset-2',
                        'hover:ring-red-400',
                        'transition-all',
                        'ease-out',
                        'duration-200'
                    );
                    habitBtn.innerHTML = `
                        <div class="inline-block group-hover:translate-x-0.5 transition-all ease-out duration-200">${habit.title}</div>
                        <div class="ml-6"><i class="fa-solid fa-square-xmark"></i></div>
                `;
                }

                habitBtn.addEventListener('click', async (e) => {
                    console.log(e.currentTarget.id);
                    const habitId = e.currentTarget.id;
                    console.log(habitId);
                    console.log(habit);
                    if (habit.done === false) {
                        habit.done = true;
                        console.log(habit);
                        const response = await fetch(
                            `http://localhost:3000/habits/${habitId}`,
                            {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ done: true }),
                            }
                        );
                        const dataPatch = await response.json();
                        console.log(dataPatch);
                        await getHabits();
                    }
                });

                habitDiv.appendChild(habitBtn);
            });
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const todayHabits = await getHabits();
    console.log(todayHabits);

    const addButton = document.querySelector('#newHabit');
    addButton.addEventListener('click', () => {
        console.log('click sur add');

        // const newHabit = document.createElement('div');
        // newHabit.classList.add('habit');
        // newHabit.innerHTML = `
        //     <input type="text" class="habitName" placeholder="Nom de l'habitude">
        //     <button class="remove">Supprimer</button>
        // `;
        // habitsDiv.appendChild(newHabit);
    });
};

main();
