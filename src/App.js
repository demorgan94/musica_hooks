import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';

function App() {

  const [artista, setArtista] = useState('');
  const [letra, setLetra] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    consultarAPIInfo();
  }, [artista]);

  const consultarAPILetra = async (busqueda) => {
    const { artista, cancion } = busqueda;

    let url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    const res = await axios(url);

    setLetra(res.data.lyrics);

    setArtista(artista);
  }

  const consultarAPIInfo = async () => {
    if (artista) {
      let url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const res = await axios(url);

      setInfo(res.data.artists[0]);
    }
  }

  return (
    <Fragment>
      <Formulario consultarAPILetra={consultarAPILetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
