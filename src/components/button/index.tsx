import React from 'react';
import styles from '@/styles/components/_button.module.scss';

interface Props {
  text: string;
  variant: 'cancel' | 'confirm' | 'delete';
  onClick?: () => void;
}

const Button = ({ text, variant, onClick }: Props) => {
  const buttonClass = `${styles.Button} ${styles[`Button--${variant}`]}`;
  return (
    <button
      className={buttonClass}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
