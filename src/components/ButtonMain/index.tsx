import React, { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

function ButtonMain({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : '' }`}
      {...props} 
    />
  );
}

export default ButtonMain;