import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@filme"); //pegando a lista de filmes do localStorage
    setFilmes(JSON.parse(minhaLista) || []); //se minhaLista for null, filmesSalvos será um array vazio
  }, []);

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes:</h1>
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
