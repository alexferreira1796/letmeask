import React, { FormEvent } from 'react';
import '../Home/styles.scss';
import './styles.scss'

import { Link, useHistory } from 'react-router-dom';
import Illustration from '../../assets/images/illustration.svg';
import Logo from '../../assets/images/logo.svg';

import ButtonMain from '../../components/ButtonMain';
import { database } from '../../services/firebase.connection';
import {useAuth} from '../../hoooks/useAuth';

function NewRoom() {
  const history = useHistory();
  const {user} = useAuth();
  const [newRoom, setNewRoom] = React.useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2 className="entry">Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={({target}) => setNewRoom(target.value)}
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