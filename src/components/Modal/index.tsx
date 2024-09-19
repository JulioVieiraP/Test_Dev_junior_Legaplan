import { useState } from 'react';
import Button from '../button';
import styles from '@/styles/components/_modal.module.scss';

type Props = {
  toggleMenu: () => void;
  variant: 'delete' | 'confirm';
  id?: string;
  handleDelete?: (id: string) => void;
  onTaskChange?: () => void;
};

export default function Modal({ variant, toggleMenu, id, handleDelete, onTaskChange }: Props) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = async () => {
    if (handleDelete && id) {
      setLoading(true);
      await handleDelete(id);
      setLoading(false);
      toggleMenu();
      if (onTaskChange) onTaskChange();
    }
  };

  const handleSubmit = async (title: string) => {
    if (!title) return;
    
    try {
      setLoading(true);

      const newTask = {
        title: title,
        completed: false,
      };

      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Falha ao adicionar a nova tarefa');
      }

      setNewTaskTitle('');
      toggleMenu();
      if (onTaskChange) onTaskChange();
    } catch (error) {
      console.error('Erro ao adicionar a nova tarefa:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.Modal__overlay} onClick={toggleMenu}></div>
      <div className={styles.Modal__content}>
        {variant === 'delete' ? (
          <>
            <h2>Deletar tarefa</h2>
            <p>Tem certeza que você deseja deletar essa tarefa?</p>
            <div className={styles.Modal__content__button}>
              <Button text='Cancelar' variant='cancel' onClick={toggleMenu} />
              <Button
                text={loading ? 'Deletando...' : 'Deletar'}
                variant='delete'
                onClick={() => handleDeleteClick()}
              />
            </div>
          </>
        ) : (
          <>
            <h2>Nova Tarefa</h2>
            <div className={styles.Modal__content__campo}>
              <label htmlFor='titulo'>Título</label>
              <input
                type='text'
                placeholder='Digite'
                id='titulo'
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <div className={styles.Modal__content__button}>
              <Button text='Cancelar' variant='cancel' onClick={toggleMenu} />
              <Button
                text={loading ? 'Adicionando...' : 'Adicionar'}
                variant='confirm'
                onClick={() => handleSubmit(newTaskTitle)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
