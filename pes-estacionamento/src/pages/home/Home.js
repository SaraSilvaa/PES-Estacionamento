import React, { useState, useEffect } from 'react';
import SidebarMenu from '../../components/sidebar/sidebar';
import './StyleHome.css';
import axios from 'axios';
import carro from '../../img/carro.png';
import sinal from '../../img/sinal.png';

import { format } from 'date-fns'; 
// import { ModelTraining } from '@mui/icons-material';

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

  const getDataAtual = () => {
    return format(new Date(), 'dd-MM-yyyy');
  };

  useEffect(() => {
    pesquisarVeiculos();
  }, []);

  const finalizarRegistro = async (id) => {
    try {
      await pesquisarVeiculos();
      openModal(id);
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
  // const openModalAndFinalizar = (id) => {
  //   openModal(id);
  //   finalizarRegistro(id);
  // };
  
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
                <tr key={index}>
                  <td>{contato.tipoAutomovel}</td>
                  <td>{contato.placa}</td>
                  <td>{contato.cpfcnpj}</td>
                  <td>{contato.data}</td>
                  <td>{contato.tempoEntrada}</td>
                  <td>
                    {contato.status.toLowerCase() === 'ativo' ? (
                      <span style={{ color: 'green', marginRight: '8px' }}>●</span>
                    ) : null}
                    {contato.status}
                  </td>
                  
                
                  <button className='EnviarCadastro' onClick={() => openModal(contato._id)}>Finalizar</button>
                </tr>
              ))}
            </tbody>
          </table>
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
        {/* Bola centralizada acima do card */}
        <div className="bola">
          <div className="circulo">
            <img src={sinal} alt="Sinal de Estacionamento" />
          </div>
        </div>

        {/* Encontrar o item correto com base no ID */}
        {selectedItem && isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
      <div className="card">
        {/* Bola centralizada acima do card */}
        <div className="bola">
          <div className="circulo">
            <img src={sinal} alt="Sinal de Estacionamento" />
          </div>
        </div>

        {/* Encontrar o item correto com base no ID */}
        {contato.map(item => {
          if (item._id === selectedItem) {
            return (
              <React.Fragment key={item._id}>
                {/* Use a classe placaInput aqui */}
                                <p className='placaInput'>Placa {item.placa}</p>


                {/* Outras informações se necessário */}
                {/* <p>CPF/CNPJ: {item.cpfcnpj}</p> */}
                {/* <p>Data: {item.data}</p> */}
                <p>Hora Entrada: {item.tempoEntrada}</p>

                <input type="text" placeholder="Valor" /><br></br>

                {/* Adicione as classes corretas para os estilos dos botões */}
                <div className='botoes'>
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