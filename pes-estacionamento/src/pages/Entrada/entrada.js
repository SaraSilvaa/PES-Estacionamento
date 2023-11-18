import '../../pages/Entrada/entrada.css';
import {  useNavigate } from 'react-router-dom';
import Logo from '../../img/logo.png';
import React, { useState } from 'react';

export const Entrada = () => {
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleEntrar = () => {
    if (senha === 'abc123') {
      navigate('/Cadastro');
    } else {
      alert('Senha incorreta. Tente novamente.');
    
    }
  };

  return (
    <div className='container'>
      <img src={Logo} alt="Logo" className="logo" />
      <h1 className="title">Bem-vindo(a)!!</h1>
      <p className="subtitle">Insira a senha do sistema:</p>
      
      <input
        type="password"
        placeholder="Digite sua senha...(abc123)"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleEntrar}>Entrar</button>
    </div>
  );
};

export default Entrada;
