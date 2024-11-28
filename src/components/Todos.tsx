import type { ListOfTodos, TodoId, Todo as TodoType } from '../type';
import { Todo } from './Todo';

// const [parent] = useAutoAnimate();

interface Props {
  todos: ListOfTodos;
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void;
  onRemoveTodo: ({ id }: TodoId) => void;
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted }) => {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleted={onToggleCompleted}
          />
        </li>
      ))}
    </ul>
  );
};
