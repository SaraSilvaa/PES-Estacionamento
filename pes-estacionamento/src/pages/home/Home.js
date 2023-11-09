import './Home.css';
import logo from '../../img/Group 31.png';
import React, { useState, useEffect } from 'react';
import cadastro from '../../img/icone_cadastro.png';
import Buscar from '../../img/icone_buscarcarros.png';
import Faturar from '../../img/icone_faturamento.png';
import axios from 'axios';
import Header  from '../../components/header';

export const Cadastro = () => {
  const [page, setPage] = useState('cadastro');
  const [contato, setContatos] = useState([]);
  const [tipoAutomovel, setTipo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cpfcnpj, setCpfCnpj] = useState('');
  const [status, setStatus] = useState('');
  const [tempoSaida, setSaida] = useState('');
  const [valor, setvalor] = useState('');
  const [tempoEntrada, setEntrada] = useState('');
  const [ano, setAno] = useState('');
  const [nome, setNome] = useState('');


  
  
  const [cadastroStatus, setCadastroStatus] = useState(null);

  const getHoraAtual = () => {
    const horaAtual = new Date();
    return `${horaAtual.getHours()}:${horaAtual.getMinutes()}`;
  };
  const getHoraAtual2 = () => {
    const horaAtual2 = new Date();
    return `${horaAtual2.getHours()}:${horaAtual2.getMinutes()}`;
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
        tempoSaida,
        valor,
        ano,
        nome,
      });
  
      if (response.status === 200) {
        // Cadastro bem-sucedido
        setCadastroStatus('Cadastro realizado com sucesso.');
      } else {
        // Trate erros de acordo com a resposta do servidor
        setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error(error); // Isso imprimirá o erro no console
      setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };
  const pesquisarVeiculos = async () => {
    try {
      const response = await axios.get('https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel');
  
      if (response.status === 200) {
        // Os veículos foram encontrados com sucesso
        setContatos(response.data); // Atualize o estado com os veículos encontrados
      } else {
        // Trate erros de acordo com a resposta do servidor
        console.log('Erro ao buscar veículos.');
      }
    } catch (error) {
      console.error(error);
      console.log('Erro ao buscar veículos.');
    }
  };
  
  

  const renderContent = () => {
    if (page === 'cadastro') {
      return (
        <div className='FormInput'>

          <h1 className='title'>Cadastro de Veículo <img src={cadastro} className='IconeTela' alt='logo' /></h1>

          <div className=''>
            <form className='FormCadastro'>
              <div className='inputs'>
                <div className=''>
                  <label>CNPJ/CPF</label>
                  <input
                    type='text'
                    name='cpfcnpj'
                    placeholder='CNPJ/CPF'
                    value={cpfcnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                  />
                </div>
                <div className=''>
                  <label>Modelo</label>
                  <input
                    type='text'
                    name='Modelo'
                    placeholder='Modelo do Veículo'
                    maxLength={14}
                    
                    value={tipoAutomovel}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                </div>
                <div className=''>
                  <label>Ano</label>
                  <input
                    type='text'
                    name='Ano'
                    placeholder='Ano do Veículo'
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  />
                </div>
              </div>
              <div className='inputsDireita'>
                <div className=''>
                  <label>Placa</label>
                  <input
                    type='text'
                    name='Placa'
                    placeholder='Placa do Veículo'
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                  />
                </div>
             
              
                <div className=''>
                  <label>Hora Saida</label>
                  <input type="text" value={getHoraAtual2()} readOnly />
                </div>
                <div className=''>
                  <label>Status</label>
                  <input
                    type='text'
                    name='status'
                    placeholder='Status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className=''>
                  <label>Valor</label>
                  <input
                    type='text'
                    name='Nome'
                    placeholder='Nome Proprietário'
                    value={valor}
                    onChange={(e) => setvalor(e.target.value)}
                  />
                </div>
                <div className=''>
                  <label>Hora Entrada</label>
                  <input type="text" value={getHoraAtual()} readOnly />
                </div>
              </div>
              <p></p>
            </form>
            <button className='EnviarCadastro' type="submit" onClick={(e) => handleSubmit(e, getHoraAtual())}>
              Cadastrar
            </button>
            {cadastroStatus && <div className="cadastro-status">{cadastroStatus}</div>}

          </div>
        </div>
      );
    } else if (page === 'pesquisar') {
      return (
        <div>
          <h1 className='title'>Pesquisar Veículos <img src={Buscar} className='IconeTela' alt='logo' /></h1>
          <div className='Pesquisa'>
           <input
  type="text"
  placeholder="Pesquisar"
 

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
              </tr>
            </thead>
            <tbody>
              {contato.map((contato, index) => (
                <tr key={index}>
                  <td>{contato.tipoAutomovel}</td>
                  <td>{contato.placa}</td>
                  <td>{contato.cpfcnpj}</td>
                  <td>{contato.tempoEntrada}</td>
                  <td>{contato.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (page === 'faturamento') {
      return (
        <div>
          <h1 className='title'>Relação de Faturamento <img src={Faturar} className='IconeTela' alt='logo' /></h1>
        </div>
      );
    }
  };

  return (
    <div className=''>
      <Header />
      <header className={''}>
        <img src={logo} className='IconeTela' alt='logo' />
      </header>
      <body>
        <div className='Navbar-Lateral'>
          <button onClick={() => setPage('cadastro')}>
            Cadastrar Veículo
            <img src={cadastro} className='IconeTela' alt='logo' />
          </button>
          <button onClick={() => {
  setPage('pesquisar');
  pesquisarVeiculos();
}}>
  Pesquisar veículos
  <img src={Buscar} className='IconeTela' alt='logo' />
</button>
          <button onClick={() => setPage('faturamento')}>
            Faturamento
            <img src={Faturar} className='IconeTela' alt='logo' />
          </button>
        </div>
      </body>
      <div className='Card-principal'>
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};