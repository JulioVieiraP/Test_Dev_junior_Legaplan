import Image from 'next/image';
import styles from '@/styles/components/_list.module.scss';
import { useState } from 'react';
import Modal from '../Modal';
import { Data } from '@/app/page';

type Props = {
  data: Data[],
  onTaskChange: () => void
}

export default function List({data, onTaskChange}: Props) {
  const [ModalDelete, setModalDelete] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const toggleMenu = () => setModalDelete(!ModalDelete);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar a tarefa');
      }

      onTaskChange();
      setModalDelete(false);
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  const handleItemDeleteClick = (id: string) => {
    setSelectedItemId(id);
    toggleMenu();
  };

  const handleCheckboxChange = async (id: string) => {
    const taskToUpdate = data.find(task => task.id === id);
  
    if (!taskToUpdate) {
      console.error('Tarefa não encontrada');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...taskToUpdate, completed: !taskToUpdate.completed }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa');
      }

      onTaskChange();
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
    }
  };

  const pendingTasks = data.filter(task => !task.completed);
  const completedTasks = data.filter(task => task.completed);

  return (
    <div className={styles.List}>
      <div className={styles.List__header}>
        <h3>Suas tarefas de hoje</h3>
      </div>
      
      <ul className={styles.List__tasks}>
        {pendingTasks.length > 0 ? (
          pendingTasks.map(({ id, title, completed }) => (
            <li key={id} className={styles.List__item}>
              <input 
                type="checkbox" 
                id={id} 
                checked={completed} 
                onChange={() => handleCheckboxChange(id)}
              />
              <div>
                <label htmlFor={id}>{title}</label>
              </div>
              <Image 
                src="/images/trash.png" 
                alt="Icon" 
                width={24} 
                height={24} 
                onClick={() => handleItemDeleteClick(id)}
              />
            </li>
          ))
        ) : (
          <div className={styles.List__tasks__msg}>
            <p>Não possui nenhuma tarefa ainda, adicione uma.</p>
          </div>
        )}
      </ul>

      <div className={styles.List__completed}>
        <h3 className={styles.List__header}>Tarefas finalizadas</h3>
        <ul>
          {completedTasks.map(({ id, title, completed }) => (
            <li className={styles.List__item} key={id}>
              <input 
                type="checkbox" 
                id={id} 
                checked={completed} 
                onChange={() => handleCheckboxChange(id)}
              />
              <div>
                <label htmlFor="task4">{title}</label>
              </div>
              <Image 
                src="/images/trash.png" 
                alt="Icon" 
                width={24} 
                height={24} 
                onClick={() => handleItemDeleteClick(id)}
              />
            </li>
          ))}
        </ul>
      </div>

      {ModalDelete && (
        <Modal variant='delete' toggleMenu={toggleMenu} handleDelete={handleDelete} id={selectedItemId ?? ''}/>
      )}
    </div>
  );
}
