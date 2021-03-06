import React from 'react';
import {useParams, useHistory} from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import aswerImg from '../../assets/images/answer.svg';
import './styles.scss';

import ButtonMain from '../../components/ButtonMain';
import RoomCode from '../../components/RoomCode';
import Question from '../../components/Question';

import { useRoom } from '../../hoooks/useRoom';
import { database } from '../../services/firebase.connection';

type RoomParams = {
  id: string;
}

function Admin() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handeEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    history.push('/');
  }

  async function handeDeleteQuestion(id: string) {
    if( window.confirm('Tem certeza que você deseja excluir esta pergunta?') ) {
      await database.ref(`rooms/${roomId}/questions/${id}`).remove();
    }
  }

  async function handleCheckQuestion(id: string) {
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(id: string) {
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isHighlighted: true
    });
  }
  
  return (
    <div id="page_room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <ButtonMain isOutlined={true} onClick={handeEndRoom}>Encerrar Sala</ButtonMain>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room_title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length > 1 ? `${questions.length} perguntas`  : `1 pergunta` }</span>}
        </div>

        <div className="question_list">
          {
            questions.map((question) => {
              return (
                <Question 
                  content={question.content} 
                  author={question.author}
                  key={question.id}
                  isAnswerd={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  
                  {
                    !question.isAnswered && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCheckQuestion(question.id)}
                        >
                          <img src={checkImg} alt="Verificar pergunta" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleHighlightQuestion(question.id)}
                        >
                          <img src={aswerImg} alt="Responder pergunta" />
                        </button>
                      </>
                    )
                  }
                  <button
                    type="button"
                    onClick={() => handeDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default Admin;