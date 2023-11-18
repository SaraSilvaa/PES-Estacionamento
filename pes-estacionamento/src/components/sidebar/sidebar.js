import React from 'react';
import '../sidebar/sidebar.css';
import logo from '../../img/Group 31.png';
import { Link,   } from 'react-router-dom';


const SidebarMenu = ({ changePage }) => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li onClick={() => changePage('Cadastrar')}>Cadastrar veículo</li>
        <li onClick={() => changePage('Pesquisar')}>Pesquisar veículos</li>
        <li onClick={() => changePage('Faturar')}>Faturamento</li>
      </ul>
      {/* Imagem no rodapé */}
      <div className="sidebar-footer">
      <Link to="/">
      <button className='btnsair'>Sair</button>
      </Link>
        <img src={logo} alt="Logo" className="sidebar-logo" />
        
      </div>
    
    </div>
  );
};

export default SidebarMenu;
