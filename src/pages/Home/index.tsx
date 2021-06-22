import React from 'react';
import './styles.scss';

import { useHistory } from 'react-router-dom';
import Illustration from '../../assets/images/illustration.svg';
import Logo from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg'

import ButtonMain from '../../components/ButtonMain';
import { useAuth } from '../../hoooks/useAuth';

function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

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
          <button className="create_room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google" />
            Cria sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <ButtonMain type="submit">
              Entrar na sala
            </ButtonMain>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home;