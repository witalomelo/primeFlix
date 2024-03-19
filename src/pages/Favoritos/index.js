import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@filme"); //pegando a lista de filmes do localStorage
    setFilmes(JSON.parse(minhaLista) || []); //converte uma string JSON em um objeto JavaScript (array)
  }, []);

  function excluirFilme(id){
    let filtroFilmes = filmes.filter((item) => { //retornando todos os filmes exceto aquele com id passado como argumento
      return (item.id !== id)
    })

    setFilmes(filtroFilmes); //definindo a nova lista tirando o aquele id passado como argumento 
    localStorage.setItem("@filme", JSON.stringify(filtroFilmes)) //atualizando o repositorio local como a nova lista convertendo a array
    //em string 

  }

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes:</h1>
      {/*quando não tiver filme salvo */}
      {filmes.length === 0 && <span>Você não possui nenhum filme salvo :-( </span>} 
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
