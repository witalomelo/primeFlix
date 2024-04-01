import { useEffect, useState } from "react";
import api from "../../services/api";

function Home() {
  const [Filmes, setFilmes] = useState([]);

  
    useEffect(() => { //useEffect é um hook do React que serve para executar efeitos colaterais em componentes funcionais

        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "",
                    language: "pt-BR",
                    page: 1
             }
            })

            console.log(response.data.results);
        }

        loadFilmes();

    }, [])


  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
