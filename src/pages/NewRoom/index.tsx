import React from 'react';
import '../Home/styles.scss';
import './styles.scss'

import { Link } from 'react-router-dom';
import Illustration from '../../assets/images/illustration.svg';
import Logo from '../../assets/images/logo.svg';

import ButtonMain from '../../components/ButtonMain';

function NewRoom() {
  return (
    <div id="page_auth">
      <aside>
        <img src={Illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main_content">
          <img src={Logo} alt="LetMeAsk" />
          <h2 className="entry">Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
            />
            <ButtonMain type="submit">
              Criar sala
            </ButtonMain>
          </form>
          <p className="class_exists">
            Quer entrar em um sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom;