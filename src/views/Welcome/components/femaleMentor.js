import React from 'react';
import '../style.scss';
import { useHistory } from 'react-router-dom'
import Button from "../../../components/Button";

function FemaleMentor() {
    const history = useHistory()

  return (
    <>
      <div>
        <h1>Seja Bem Vinda</h1>
        <p>A plataforma ainda está em desenvolvimento, os usuários do gênero feminino podem escolher sua forma da cadastro
        Entre aprendiz e mentor, as aprendizes podem fazer as atividades da plataforma, e os parâmetros para definir um mentor ainda serão definidos.
        Porém você pode fazer o tutorial, e após o fim do tutorial você se tornará automáticamente mentora.
              </p>
        <form >
          {/* <Button onClick={changeToLearner}>VIRAR APRENDIZ</Button> */}
        </form>
      </div>
    </>
  );
};


export default (FemaleMentor);