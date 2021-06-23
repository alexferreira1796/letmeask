import React, { FormEvent } from 'react';
import {useParams} from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import './styles.scss';

import ButtonMain from '../../components/ButtonMain';
import RoomCode from '../../components/RoomCode';
import { useAuth } from '../../hoooks/useAuth';
import { database } from '../../services/firebase.connection';

type RoomParams = {
  id: string;
}
type Question = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
}
type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswerd: boolean;
}>
type Questions = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isHighlighted: boolean;
  isAnswerd: boolean;
}

function Room() {
  const { user } = useAuth(); 
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = React.useState('');
  const [questions, setQuestions] = React.useState<Questions[]>([]);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {

    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', snapshot => {
      const databaseRoom = snapshot.val();
      const firebaseQuestion = databaseRoom.questions as FirebaseQuestions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswerd: value.isAnswerd
        }
      });
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if(newQuestion.trim() === '') {
      return;
    }

    if(!user) {
      throw new Error('You must be logged in');
    }

    const question: Question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }
  
  return (
    <div id="page_room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room_title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length > 1 ? `${questions.length} perguntas`  : `1 pergunta` }</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={({target}) => setNewQuestion(target.value)}
          />
          <div className="form_footer">
            { user ? (
              <div className="user_info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
            ) }
            <ButtonMain type="submit" disabled={!user}>Enviar pergunta</ButtonMain>
          </div>
        </form>

      </main>
    </div>
  )
}

export default Room;