import React , {InputHTMLAttributes } from 'react';
import './index.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  label: string;
}
const Input: React.FC<InputProps> = ({name, label, ...rest}) => {
  return (
    <div className="checkbox-block">
      <label htmlFor={name}>{label}</label>
      <input type="checkbox" id={name} {...rest} />
    </div>
  );
};

export default Input;
