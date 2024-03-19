import path from 'path';
import fs from 'fs/promises';

const habitsPath = path.join(process.cwd(), 'database.json');
const readFile = async () => {
    const habits = JSON.parse(await fs.readFile(habitsPath, 'utf-8'));
    return habits;
};

export const getHabits = async () => {
    const habits = await readFile();
    return habits.habits;
};

const writeFile = async (newValues) => {
    const oldValues = JSON.parse(await fs.readFile(habitsPath, 'utf-8'));
    await fs.writeFile(
        habitsPath,
        JSON.stringify({ ...oldValues, ...newValues }, null, 4),
        (error) => {
            if (error) {
                console.log('An error has occurred ', error);
                return;
            }
            console.log('Data written successfully to disk');
        }
    );
};

export const getTodayHabits = async () => {
    const habits = await getHabits();
    const today = new Date().toISOString().split('T')[0];

    return habits.map((habit) => {
        return {
            ...habit,
            done: habit.daysDone[today] || false,
        };
    });
    // return habits.habits.filter((habit) =>
    //     Object.keys(habit.daysDone).includes(today)
    // );
};

export const addHabit = async (title) => {
    const habits = await getHabits();
    const newHabit = {
        id: (habits[habits.length - 1].id || 0) + 1,
        title,
        daysDone: {},
    };

    habits.push(newHabit);
    await writeFile({ habits });
    return newHabit;
};

export const updateHabit = async (id, done) => {
    const habits = await getHabits();
    const habitToUpdate = habits.find((habit) => habit.id === id);
    if (!habitToUpdate) {
        throw new Error('Habit not found');
    }

    const today = new Date().toISOString().split('T')[0];
    habitToUpdate.daysDone[today] = done;
    await writeFile({ habits });
    return habitToUpdate;
};
