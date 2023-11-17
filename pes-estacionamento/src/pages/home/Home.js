import React, { useState, useEffect } from 'react';
import SidebarMenu from '../../components/sidebar/sidebar';
import axios from 'axios';
import { format } from 'date-fns';
import carro from '../../img/carro.png';
import sinal from '../../img/sinal.png';
import './StyleHome.css';

export const Cadastro = () => {
  const [page, setPage] = useState('Home');
  const [tipoAutomovel, setTipo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cpfcnpj, setCpfCnpj] = useState('');
  const [cadastroStatus, setCadastroStatus] = useState(null);
  const [contato, setContatos] = useState([]);
  const [valor, setValor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState(true);
  const [switchStatus, setSwitchStatus] = useState(true);

  const updateAutomovel = async (id, data) => {
    try {
      const response = await axios.put(`https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel/${id}`, data);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      console.log('Response:', error.response ? error.response.data : null);
    }
  };

  const getDataAtual = () => {
    return format(new Date(), 'dd-MM-yyyy');
  };

  useEffect(() => {
    pesquisarVeiculos();
  }, []);

  const handleFiltroClick = () => {
    setFiltroAtivo(!filtroAtivo);
    setSwitchStatus(!switchStatus);
  };

  const finalizarRegistro = async (id) => {
    console.log('Finalizar registro com o ID:', id);
  
    try {
      const horaSaida = getHoraAtual();
  
      const selectedItemData = contato.find((item) => item._id === id);
      console.log('Contato DPS do find:', selectedItemData);
  
      if (!selectedItemData) {
        console.error('Erro ao finalizar registro: Item não encontrado.');
        setCadastroStatus('Erro ao finalizar registro. Item não encontrado.');
        return;
      }
  
      const duracao = calcularDuracao(
        selectedItemData.tempoEntrada,
        horaSaida
      );
  
      const updateFields = {
        valor: calcularValor(duracao),
        horaSaida,
        status: 'A Finalizar',
      };
  
      await updateAutomovel(id, updateFields);
  
      setCadastroStatus('Registro finalizado com sucesso.');
      pesquisarVeiculos();
      setIsModalOpen(false);
    } catch (error) {
      handleErroFinalizarRegistro(error);
    }
  };
  

  const handleErroFinalizarRegistro = (error) => {
    console.error('Erro ao finalizar registro:', error);
    console.log('Response:', error.response ? error.response.data : null);

    if (error.response && error.response.data && error.response.data.message) {
      setCadastroStatus(`Erro ao finalizar registro: ${error.response.data.message}`);
    } else {
      setCadastroStatus('Erro ao finalizar registro. Tente novamente.');
    }
  };

  const openModal = (id) => {
    console.log('Você abriu o cliente com ID:', id);

    if (id) {
      const selectedItemData = contato.find((item) => item._id === id);

      if (selectedItemData) {
        setSelectedItem(selectedItemData);
        setIsModalOpen(true);
      } else {
        console.error('Erro ao abrir modal: Item não encontrado.');
      }
    } else {
      console.error('Erro ao abrir modal: ID não fornecido.');
    }
  };
  const calcularDuracao = (entrada, saida) => {
    const entradaHora = new Date(`01/01/2000 ${entrada}`);
    const saidaHora = new Date(`01/01/2000 ${saida}`);
  
    if (isNaN(entradaHora) || isNaN(saidaHora)) {
      console.error('Erro ao calcular a duração: valores inválidos.');
      return 0; // ou outra lógica apropriada para valores inválidos
    }
  
    const diffMilliseconds = saidaHora - entradaHora;
    const diffMinutes = diffMilliseconds / (1000 * 60);
    return diffMinutes;
  };
  

  const calcularValor = (duracao) => {
    const taxaHora = 5;
    const valor = duracao * (taxaHora / 60);
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
  const calcularTotalFaturado = () => {
  // Lógica para calcular o total faturado com base nos dados de contato
  let totalFaturado = 0;

  contato.forEach((item) => {
    if (item.status.toLowerCase() === 'finalizado') {
      const valorFaturado = parseFloat(item.valor);

      if (!isNaN(valorFaturado)) {
        totalFaturado += valorFaturado;
      }
    }
  });

  return totalFaturado.toFixed(2);
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
      const response = await axios.post(
        'https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel',
        {
          tipoAutomovel,
          placa,
          cpfcnpj,
          status: 'Ativo',
          tempoEntrada: getHoraAtual(),
          valor,
          data: getDataAtual(),
        }
      );

      if (response.status === 200 || response.status === 201) {
        setCadastroStatus('Cadastro realizado com sucesso.');
        pesquisarVeiculos();
        setValor(null);
      } else {
        handleErroCadastro('Erro ao cadastrar. Por favor, tente novamente.');
      }
    } catch (error) {
      handleErroCadastro('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  const handleErroCadastro = (mensagem) => {
    setCadastroStatus(mensagem);
  };


  return (
    <div className="body">
<SidebarMenu changePage={setPage} />

      {page === 'Cadastrar' && (
        <div className="FormInput">
          <form onSubmit={handleSubmit}>
            <label>
              Modelo:
              <input
                className="cadastroInput"
                type="text"
                value={tipoAutomovel}
                onChange={(e) => setTipo(e.target.value)}
              />
            </label>
            <label>
              Placa:
              <input
                className="cadastroInput"
                type="text"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
              />
            </label>
            <label>
              CPF/CNPJ:
              <input
                className="cadastroInput"
                type="text"
                value={cpfcnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
              />
            </label>
            <label>
              Data:
              <input
                className="cadastroInput"
                type="text"
                value={getDataAtual()}
                readOnly
              />
            </label>
            <label>
              Hora de Entrada:
              <input
                className="cadastroInput"
                type="text"
                value={getHoraAtual()}
                readOnly
              />
            </label>
            <button className="EnviarCadastro" type="submit">
              Cadastrar
            </button>
          </form>
          {cadastroStatus && <p>{cadastroStatus}</p>}
        </div>
      )}

      {page === 'Pesquisar' && (
        <div className="FormTable">
          <label className="switch">
            <input
              type="checkbox"
              className={`FiltroAtivo ${
                filtroAtivo ? 'ligado' : 'desligado'
              }`}
              onClick={handleFiltroClick}
            />
            <span id="mySlider" className="slider round"></span>
          </label>
          <div className="DivTabela">
            <table className="Tabela">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Placa</th>
                  <th>CPF/CNPJ</th>
                  <th>Data</th>
                  <th>Hora Entrada</th>
                  <th>Status</th>
                  {switchStatus && <th>Finalizar estadia</th>}
                </tr>
              </thead>
              <tbody>
              {contato
  ?.filter((contato) =>
    filtroAtivo
      ? contato.status.toLowerCase() === 'ativo' 
      : contato.status.toLowerCase() === 'finalizado' || contato.status.toLowerCase() === 'a finalizar'
  )
  .map((contato, index) => (
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
        ) : contato.status.toLowerCase() === 'a finalizar' ? (
          <span style={{ color: 'red', marginRight: '8px' }}>●</span>
        ) : null}
        {contato.status}
      </td>
      {contato.status.toLowerCase() === 'a finalizar' ? (
  <>
    <td>{`R$ ${calcularValor(calcularDuracao(contato.tempoEntrada, getHoraAtual()))}`}</td>
    <td>{contato.tempoSaida}</td>
  </>
) : contato.status.toLowerCase() !== 'finalizado' && (
  <>
    <td>
      <button
        className="Finalizar"
        onClick={() => openModal(contato._id)}
      >
        Finalizar
      </button>
    </td>
  </>


      )}
    </tr>
  ))}

              </tbody>
            </table>
          </div>
        </div>
      )}

{page === 'Faturar' && (
  <div className="dashboard">
    <div className="dashboard-header">
      <h2>Resumo Financeiro</h2>
      <div className="resumo">
        <p>Total Faturado: <span className="valor">R$ {calcularTotalFaturado()}</span></p>
        <p>Número de Estadias: {contato.length}</p>
      </div>
    </div>

    <div className="dashboard-content">
      <h2>Relatório de Faturamento</h2>
      <table className="relatorio">
        <thead>
          <tr>
            <th>Data</th>
            <th>Total Faturado</th>
            {/* Outras colunas do relatório */}
          </tr>
        </thead>
        <tbody>
          {contato
            .filter((item) => item.status.toLowerCase() === 'finalizado')
            .map((item, index) => (
              <tr key={index}>
                <td>{item.data}</td>
                <td>{`R$ ${item.valor}`}</td>
                {/* Outras colunas do relatório */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      {selectedItem && isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <div className="card">
              <div className="bola">
                <div className="circulo">
                  <img src={sinal} alt="Sinal de Estacionamento" />
                </div>
              </div>

              <React.Fragment>
                <p className="placaInput">Placa {selectedItem.placa}</p>
                <p className="data">{selectedItem.data}</p>
                <p>Hora Entrada: {selectedItem.tempoEntrada}</p>
                <div className="Imagem">
                  <img className="carroimg" src={carro} alt="carro" />
                </div>
                <input
                  type="text"
                  placeholder="Valor"
                  value={`R$ ${calcularValor(
                    calcularDuracao(
                      selectedItem.tempoEntrada,
                      getHoraAtual()
                    )
                  )}`}
                  readOnly
                />
                <br />
                <div className="botoes">
                  <br></br>
                  <button
                    className="finalizar"
                    onClick={() => finalizarRegistro(selectedItem._id)}
                  >
                    Pagamento
                  </button>
                  <button
                    className="cancelar"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
