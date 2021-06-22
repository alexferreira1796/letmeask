import React, { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function ButtonMain(props: ButtonProps) {
  return (
    <button className="button" {...props} />
  );
}

export default ButtonMain;