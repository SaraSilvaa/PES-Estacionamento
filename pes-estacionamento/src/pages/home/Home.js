import React, { useState, useEffect } from 'react';
import SidebarMenu from '../../components/sidebar/sidebar';
import './StyleHome.css';
import axios from 'axios';
import carro from '../../img/carro.png';
import sinal from '../../img/sinal.png';

import { format } from 'date-fns'; 

export const Cadastro = () => {
  const [page, setPage] = useState('Home');
  const changePage = (newPage) => {
    setPage(newPage);
  };
  const [id, ] = useState('');
  const [tipoAutomovel, setTipo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cpfcnpj, setCpfCnpj] = useState('');
  const [status] = useState('Ativo');
  const [cadastroStatus, setCadastroStatus] = useState(null);
  const [contato, setContatos] = useState([]);
  const [valor, setValor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState(true); // Novo estado para controle do filtro
  const getDataAtual = () => {
    return format(new Date(), 'dd-MM-yyyy');
  };

  useEffect(() => {
    pesquisarVeiculos();
  }, []);
  const handleFiltroClick = () => {
    // Inverte o estado do filtro entre ativo e inativo
    setFiltroAtivo(!filtroAtivo);
  };
  const finalizarRegistro = async (id) => {
    try {
      const horaSaida = getHoraAtual();

      // Update the automovel with the exit time
      await axios.put(`https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel/${id}`, {
        tempoSaida: horaSaida,
      });

      // Calculate duration and cost
      const entryTime = contato.find(item => item._id === id).tempoEntrada;
      const duration = calcularDuracao(entryTime, horaSaida);
      const cost = calcularValor(duration);

      // Open modal with additional information, including cost
      openModal(id, cost);
    } catch (error) {
      console.error('Erro ao finalizar registro:', error);
    }
  };
  const openModal = (id) => {
    console.log("Selected Contact ID do OPENMOD:", id);
  
    // Ensure that selectedItem is not undefined before setting the state
    if (id) {
      setSelectedItem(id);
      setIsModalOpen(true);
    } else {
      console.error('Erro ao abrir modal: Item não encontrado.');
    }
  };
  
  const calcularDuracao = (entrada, saida) => {
    const entradaHora = new Date(`01/01/2000 ${entrada}`);
    const saidaHora = new Date(`01/01/2000 ${saida}`);
    const diffMilliseconds = saidaHora - entradaHora;
    const diffMinutes = diffMilliseconds / (1000 * 60);
    return diffMinutes;
  };
// Adicione um ouvinte de evento para o change do input do slider


  const calcularValor = (duracao) => {
    // Assuming a fixed rate per hour, adjust the rate as needed
    const taxaHora = 5; // Replace with your hourly rate
    const valor = duracao * (taxaHora / 60); // Convert minutes to hours
    return valor.toFixed(2);
  };
  const getHoraAtual = () => {
    const horaAtual = new Date();
    const horas = horaAtual.getHours();
    const minutos = horaAtual.getMinutes();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel', {
        id,
        tipoAutomovel,
        placa,
        cpfcnpj,
        status,
        tempoEntrada: getHoraAtual(),
        valor,
        data: getDataAtual(),
      });

      if (response.status === 200 || response.status === 201) {
        setCadastroStatus('Cadastro realizado com sucesso.');
        pesquisarVeiculos();
        setValor(null);
      } else {
        setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
      }
    } catch (error) {
      console.log(error.response);
      setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  return (
    <div className='body'>
      <SidebarMenu changePage={changePage} />

      {page === 'Cadastrar' && (
        <div className='FormInput'>
          <form onSubmit={handleSubmit}>
            <label>
              Tipo de Automóvel:
              <select className='cadastroInput' value={tipoAutomovel} onChange={(e) => setTipo(e.target.value)}>
                <option value="carro">Carro</option>
                <option value="moto">Moto</option>
              </select>
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
              Data:
              <input className='cadastroInput' type="text" value={getDataAtual()} readOnly />
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





<label className="switch">
  <input type="checkbox" className={`FiltroAtivo ${filtroAtivo ? 'ligado' : 'desligado'}`} onClick={handleFiltroClick} />
  
  <span id="mySlider" className="slider round"></span>
 

 </label>
<div className='DivTabela'>
  
    <table className='Tabela'>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Placa</th>
          <th>CPF/CNPJ</th>
          <th>Data</th>
          <th>Hora Entrada</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {contato?.map?.((contato, index) => (
          (filtroAtivo && contato.status.toLowerCase() === 'ativo') || (!filtroAtivo && contato.status.toLowerCase() === 'finalizado') ? (
            <tr key={index}>
              <td>{contato.tipoAutomovel}</td>
              <td>{contato.placa}</td>
              <td>{contato.cpfcnpj}</td>
              <td>{contato.data}</td>
              <td>{contato.tempoEntrada}</td>
              <td>
                {contato.status.toLowerCase() === 'ativo' ? (
                  <span style={{ color: 'green', marginRight: '8px' }}>●</span>
                ) : contato.status.toLowerCase() === 'finalizado' ? (
                  <span style={{ color: 'black', marginRight: '8px' }}>●</span>
                ) : null}
                {contato.status}
              </td>
              {contato.status.toLowerCase() !== 'finalizado' && (
                <td>
                  <button className='EnviarCadastro' onClick={() => openModal(contato._id)}>Finalizar</button>
                </td>
              )}
            </tr>
          ) : null
        ))}
      </tbody>
    </table>
    </div>
  </div>
)}


      {page === 'Faturar' && 
        <div className='title'>Contact Content</div>
      }
{selectedItem && isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
      <div className="card">
        <div className="bola">
          <div className="circulo">
            <img src={sinal} alt="Sinal de Estacionamento" />
          </div>
        </div>


{selectedItem && isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
      <div className="card">
        <div className="bola">
          <div className="circulo">
            <img src={sinal} alt="Sinal de Estacionamento" />
          </div>
        </div>

        {contato.map(item => {
          if (item._id === selectedItem) {
            const duration = calcularDuracao(item.tempoEntrada, getHoraAtual());
            const cost = calcularValor(duration);

            return (
              <React.Fragment key={item._id}>
                <p className='placaInput'>Placa {item.placa}</p>
                <p className='data'>{item.data}</p>
                <p>Hora Entrada: {item.tempoEntrada}</p>
                <div className="Imagem">
                  <img className='carroimg' src={carro} alt="carro" />
                </div>
                <input type="text" placeholder="Valor" value={`R$ ${cost}`} readOnly /><br />
                <div className='botoes'><br></br>
                  <button className="finalizar" onClick={() => finalizarRegistro(selectedItem)}>Finalizar</button>
                  <button className="cancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                </div>
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
    </div>
  </div>
)}



      </div>
    </div>
  </div>
)}




 </div>
  );
};