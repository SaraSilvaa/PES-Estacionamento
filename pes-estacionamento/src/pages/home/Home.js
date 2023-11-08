import './Home.css';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.png';

export const Home = () => {
  return (
    <div className='container'>
      <img src={Logo} alt="Logo" className="logo" />
      <h1 className="title">Bem-vindo(a)!!</h1>
      <p className="subtitle">Insira a senha do sistema:</p>
      <input type="password" placeholder="Digite sua senha..." />
      <Link to="/Cadastro">
        <button>Entrar</button>
      </Link>
    </div>
  );
}

export default Home;