import React from 'react';
import '../sidebar/sidebar.css';

const SidebarMenu = ({ changePage }) => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li onClick={() => changePage('Cadastrar')}>Cadastrar veículo</li>
        <li onClick={() => changePage('Pesquisar')}>Pesquisar veículos</li>
        <li onClick={() => changePage('Faturar')}>Faturamento</li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
