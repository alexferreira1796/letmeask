import React from 'react';
import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: React.ReactNode // Qualquer conteúdo JSX
}

function Question({
  content, author, children
}: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user_info">
          <img src={author.avatar} alt={author.name} />
          <p>{author.name}</p>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}

export default Question;