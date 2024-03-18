import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import "./filme.css";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  //useEffect(() => {}, []);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "aa17e2b78a35ef77db2729c4af17c5c2",
            language: "pt-BR",
          },
        })
        .then((response) => {
          //quando a requisição for bem sucedida
          setFilme(response.data); //response.data é o objeto que contém as informações do filme
          setLoading(false); //quando terminar de carregar, o loading será false
        })
        .catch(() => {
          //quando a requisição não for bem sucedida
          navigate("/", { replace: true }); //replace permite que o usuário volte para a página anterior
          return;
        });
    }

    loadFilme(); //chamando a função

    return () => {
      console.log("Componente desmontado");
    };
  }, [navigate, id]); //sempre que o id mudar, o useEffect será chamado

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@filme"); //pegando a lista de filmes do localStorage

    let filmesSalvos = JSON.parse(minhaLista) || []; //se minhaLista for null, filmesSalvos será um array vazio

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    ); //verificando se o filme já está salvo

    if (hasFilme) {
      alert("Você já possui esse filme salvo.");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@filme", JSON.stringify(filmesSalvos)); //salvando a lista de filmes no localStorage
    alert("Filme salvo com sucesso!");
  }

  if (loading) {
    //se loading for true
    return (
      <div className="filme-info">
        <h1>Carregando filme...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>
      <strong>Avalicação: {filme.vote_average} / 10</strong>

      <div className="area-btn">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external" //opcional
            href={`https://youtube.com/results?search_query=${filme.title}`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
