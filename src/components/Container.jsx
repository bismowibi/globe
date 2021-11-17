import React from 'react';

function Container({ children }) {
  return (
    <div
      className='py-10 w-full h-full'
      style={{ backgroundImage: "url('./dot.png')", backgroundSize: 'contain' }}
    >
      {children}
    </div>
  );
}

export default Container;
