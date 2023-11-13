import React, { useState } from 'react';
import SidebarMenu from '../../components/sidebar/sidebar';
import Buscar from '../../img/icone_buscarcarros.png';
// import Faturar from '../../img/icone_faturamento.png';
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
 const [status, setStatus] = useState('');
//  const [tempoSaida, setSaida] = useState('');
 const [valor, setvalor] = useState('');
//  const [tempoEntrada, setEntrada] = useState('');
 const [ano, setAno] = useState('');
 const [nome, setNome] = useState('');
 const [cadastroStatus, setCadastroStatus] = useState(null);

 const getHoraAtual = () => {
  const horaAtual = new Date();
  return `${horaAtual.getHours()}:${horaAtual.getMinutes()}`;
};
const getHoraAtual2 = () => {
  const horaAtual = new Date();
  return `${horaAtual.getHours()}:${horaAtual.getMinutes()}`;
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
      tempoSaida: getHoraAtual2(),
      valor,
      ano,
      nome,
    });
    
    if (response.status === 200 || response.status === 201) {
      // Cadastro bem-sucedido
      setCadastroStatus('Cadastro realizado com sucesso.');
      // Exibe a caixa de alerta
      alert('Cadastro realizado com sucesso.');
    } else {
      // Tratando erros de acordo com a resposta do servidor
      setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
      // Exibe a caixa de alerta
      alert('Erro ao cadastrar. Por favor, tente novamente.');
    }
  } catch (error) {
    console.error(error);
    setCadastroStatus('Erro ao cadastrar. Por favor, tente novamente.');
    // Exibe a caixa de alerta
    alert('Erro ao cadastrar. Por favor, tente novamente.');
  }
};
const [contato, setContatos] = useState([]);

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

// Função para lidar com o clique no botão "Finalizar"
const finalizarRegistro = async (id) => {
  try {
    // Realiza a chamada à API para excluir o registro com o ID fornecido
    const response = await axios.delete(`https://web-nf32wtl2j0zn.up-de-fra1-1.apps.run-on-seenode.com/automovel${id}`);

    if (response.status === 200) {
      console.log(`Registro com o ID ${id} finalizado com sucesso.`);
      // Atualiza a lista de contatos após a exclusão bem-sucedida (opcional)
      pesquisarVeiculos();
    } else {
      console.error(`Erro ao finalizar o registro com o ID ${id}.`);
    }
  } catch (error) {
    console.error(`Erro ao finalizar o registro com o ID ${id}.`, error);
  }
};

const renderContent = () => {
  if (page === 'Cadastrar') {
     return (
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
             Status:
             <input className='cadastroInput' type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
           </label>
           <label>
             Tempo de Entrada:
                  <input className='cadastroInput' type="text" value={getHoraAtual()} readOnly />
           </label>
           <label>
             Valor:
             <input className='cadastroInput' type="text" value={valor} onChange={(e) => setvalor(e.target.value)} />
           </label>
           <label>
             Ano:
             <input className='cadastroInput' type="text" value={ano} onChange={(e) => setAno(e.target.value)} />
           </label>
           <label>
             Nome:
             <input className='cadastroInput' type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
           </label>
           <button className='EnviarCadastro' type="submit">Cadastrar</button>
         </form>
         {cadastroStatus && <p>{cadastroStatus}</p>}
       </div>
      );
     
     } else if (page === 'Pesquisar') {
      pesquisarVeiculos();
      return (
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
                <th>Ações</th> {/* Nova coluna para os botões */}
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
                  <td>
                    {/* Adiciona um botão "Finalizar" para cada registro */}
                    <button onClick={() => finalizarRegistro(contato.id)}>Finalizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
   
     } else if (page === 'Faturar') {
       return <div className='title'>Contact Content</div>;
     }
  };

  return (
     <div>
       <SidebarMenu changePage={changePage} />
       {renderContent()}
     </div>
  );
};
