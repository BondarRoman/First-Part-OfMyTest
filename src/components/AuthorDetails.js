import React from 'react';

const AuthorDetails = ({ author }) => {
  return (
    <div>
      <h2>{author.name}</h2>
      <h2>{author.surname}</h2>
      <h2>{author.fathersname}</h2>
      <h2>{author.birthday}</h2>
      {author.books.map((book, index) => {
        return (
          <div key={index}>
            <div>{book.title}</div>
            <div>{book.year}</div>
          </div>
          
        )
        
      })}
    </div>
  );
};

export default AuthorDetails;
