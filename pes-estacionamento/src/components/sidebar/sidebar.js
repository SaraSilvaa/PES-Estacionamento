import React from 'react';
import '../sidebar/sidebar.css';
import logo from '../../img/Group 31.png';

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
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>
    </div>
  );
};

export default SidebarMenu;
