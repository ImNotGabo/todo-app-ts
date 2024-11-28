import React from 'react';
import { Todos } from './components/Todos';
import { Footer } from './components/Footer';
import type { FilterValue, TodoId, TodoTitle, Todo as TodoType } from './type';
import { TODO_FILTERS } from './const';
import { Header } from './components/Header';

const mockTodo = [
  {
    id: '1',
    title: 'Diego me debe 500 pesos',
    completed: true,
  },
  {
    id: '2',
    title: 'React y TypeScript es la vuelta',
    completed: false,
  },
  {
    id: '3',
    title: 'Ando con una olla encima',
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = React.useState(mockTodo);
  const [filterSelected, setFilterSelected] = React.useState<FilterValue>(TODO_FILTERS.ALL);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filterTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    console.log(filter);
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos onToggleCompleted={handleCompleted} onRemoveTodo={handleRemove} todos={filterTodos} />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
