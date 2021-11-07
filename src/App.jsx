import React from 'react';
import Map from './components/Map';
import NewGlobe from './components/NewGlobe';

const Banner = () => {
  return (
    <div>
      <h1 className='text-5xl lg:text-7xl font-bold'>Immerse yourself</h1>
    </div>
  );
};

const App = () => {
  return (
    <div
      className='flex w-full h-screen px-10'
      style={{ backgroundImage: "url('./bg.jpg')", backgroundSize: 'cover' }}
    >
      <Banner />
      <div className='w-2/3 relative h-[800px]'>
        {' '}
        {/* <Map /> */}
        <NewGlobe />
      </div>
    </div>
  );
};

export default App;
