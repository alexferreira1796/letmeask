import React from 'react';
import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: React.ReactNode // Qualquer conteúdo JSX
  isAnswerd?: boolean;
  isHighlighted?: boolean;
}

function Question({
  content, author, isAnswerd = false, isHighlighted = false, children, 
}: QuestionProps) {
  return (
    <div className={`question ${isAnswerd ? 'answered' : ''} ${isHighlighted && !isAnswerd ? 'highlighted' : ''}`}>
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