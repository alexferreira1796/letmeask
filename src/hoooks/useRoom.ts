import React from 'react';
import { database } from '../services/firebase.connection';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

type Questions = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  const { user } = useAuth();
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
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    }

  }, [roomId, user?.id]);

  return { questions, title }

}