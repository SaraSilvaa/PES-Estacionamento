import '../../pages/Entrada/entrada.css';
import { Link, useNavigate  } from 'react-router-dom';
import Logo from '../../img/logo.png';
import React, { useState } from 'react';

export const Entrada = () => {
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleEntrar = () => {
    // Verifica se a senha inserida é "abc123"
    if (senha === 'abc123') {
      // Se a senha estiver correta, redireciona para a página de cadastro
      navigate('/Cadastro');
    } else {
      // Se a senha estiver incorreta, você pode exibir uma mensagem de erro ou tomar outra ação
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
        placeholder="Digite sua senha..."
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Link to="/Cadastro">
      <button onClick={handleEntrar}>Entrar</button>
      </Link>
    </div>
  );
}

export default Entrada;
