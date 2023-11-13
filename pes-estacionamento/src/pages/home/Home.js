import React, { useState, useEffect } from 'react';
import SidebarMenu from '../../components/sidebar/sidebar';
import Buscar from '../../img/icone_buscarcarros.png';
import './StyleHome.css';
import axios from 'axios';

export const Cadastro = () => {
  const [page, setPage] = useState('Home');
  const changePage = (newPage) => {
    setPage(newPage);
  };
  const [tipoAutomovel, setTipo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cpfcnpj, setCpfCnpj] = useState('');
  const [status] = useState('Ativo');
  const [cadastroStatus, setCadastroStatus] = useState(null);
  const [contato, setContatos] = useState([]);
  const [valor, setValor ] = useState(null);


  useEffect(() => {
    pesquisarVeiculos();
  }, []);

  const getHoraAtual = () => {
    const horaAtual = new Date();
    const horas = horaAtual.getHours();
    const minutos = horaAtual.getMinutes();
  
    // Formate os valores para garantir que sempre tenham dois dígitos
    const formatadoHoras = horas < 10 ? `0${horas}` : horas;
    const formatadoMinutos = minutos < 10 ? `0${minutos}` : minutos;
  
    return `${formatadoHoras}:${formatadoMinutos}`;
  };
  

  const pesquisarVeiculos = async () => {
    try {
      const response = await axios.get('https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel');

      if (response.status === 200) {
        setContatos(response.data);
      } else {
        console.log('Erro ao buscar veículos:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };

  const finalizarRegistro = async (id) => {
    try {
      const response = await axios.delete(`https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel${id}`);

      if (response.status === 200) {
        console.log(`Registro com o ID ${id} finalizado com sucesso.`);
        pesquisarVeiculos();
      } else {
        console.error(`Erro ao finalizar o registro com o ID ${id}.`);
      }
    } catch (error) {
      console.error(`Erro ao finalizar o registro com o ID ${id}.`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel', {
        tipoAutomovel,
        placa,
        cpfcnpj,
        status,
        tempoEntrada: getHoraAtual(),
        valor,
      });
  
      if (response.status === 200 || response.status === 201) {
        setCadastroStatus('Cadastro realizado com sucesso.');
        alert('Cadastro realizado com sucesso.');
        pesquisarVeiculos();
        setValor(null); // Limpa o campo valor após o cadastro
      } else {
        setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
        alert('Erro ao cadastrar. Por favor, tente novamente.');
      }
    } catch (error) {
      console.log(error.response);
      setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
      alert('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <SidebarMenu changePage={changePage} />
      {page === 'Cadastrar' && (
        <div className='FormInput'>
          <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Tipo de Automóvel:
              <input className='cadastroInput' type="text" value={tipoAutomovel} onChange={(e) => setTipo(e.target.value)} />
            </label>
            <label>
              Placa:
              <input className='cadastroInput' type="text" value={placa} onChange={(e) => setPlaca(e.target.value)} />
            </label>
            <label>
              CPF/CNPJ:
              <input className='cadastroInput' type="text" value={cpfcnpj} onChange={(e) => setCpfCnpj(e.target.value)} />
            </label>
            <label>
              Hora de Entrada:
              <input className='cadastroInput' type="text" value={getHoraAtual()} readOnly />
            </label>
            <button className='EnviarCadastro' type="submit">Cadastrar</button>
          </form>
          {cadastroStatus && <p>{cadastroStatus}</p>}
        </div>
      )}

      {page === 'Pesquisar' && (
        <div className='FormTable'>
          <h1 className='title'>Pesquisar Veículos <img src={Buscar} className='IconeTela' alt='logo' /></h1>
          <div className='Pesquisa'>
            <input
              type="text"
              placeholder="Pesquisar"
              onChange={(e) => pesquisarVeiculos(e.target.value)}
            />
            <img src={Buscar} className='IconeLupa' alt='lupa' />
          </div>
          <table className='Tabela'>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Placa</th>
                <th>CPF/CNPJ</th>
                <th>Hora Entrada</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contato?.map?.((contato, index) => (
                <tr key={index}>
                  <td>{contato.tipoAutomovel}</td>
                  <td>{contato.placa}</td>
                  <td>{contato.cpfcnpj}</td>
                  <td>{contato.tempoEntrada}</td>
                  <td>
                    {contato.status.toLowerCase() === 'ativo' ? (
                      <span style={{ color: 'green', marginRight: '8px' }}>●</span>
                    ) : null}
                    {contato.status}
                  </td>
                  <td>
                    <button onClick={() => finalizarRegistro(contato.id)}>Finalizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {page === 'Faturar' && <div className='title'>Contact Content</div>}
    </div>
  );
};
