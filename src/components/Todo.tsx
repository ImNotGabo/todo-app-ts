import type { TodoId } from '../type';
import { type Todo as TodoType } from '../type';

interface Props extends TodoType {
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void;
  onRemoveTodo: ({ id }: TodoId) => void;
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted }) => {
  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={(event) => {
          onToggleCompleted({ id, completed: event.target.checked });
        }}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={() => {
          onRemoveTodo({ id });
        }}
      ></button>
    </div>
  );
};
