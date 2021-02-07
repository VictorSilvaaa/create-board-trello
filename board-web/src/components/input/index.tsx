import React , {InputHTMLAttributes } from 'react';
import './index.css'
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  label: string;
}
const Input: React.FC<InputProps> = ({name, label, ...rest}) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input className="input-block" type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;