import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

//movie/popular?api_key=aa17e2b78a35ef77db2729c4af17c5c2&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/popular", {
        //pegando a base url e complementando com o movie/popular  
        params: {
          api_key: "aa17e2b78a35ef77db2729c4af17c5c2",
          language: "pt-BR",
          page: 1,
        },
      });

      // console.log(response.data.results.slice(0,20));
      setFilmes(response.data.results.slice(0, 10)); //pegando os 10 primeiros filmes
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    //se for true
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filme">
        {filmes.map((filme) => {
          return (
            <article key={filme.id} >
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
