import React from 'react';
import Container from './components/Container';
import Globe from './components/Globe';
import Header from './components/Header';
import Layout from './components/Layout';

const App = () => {
  return (
    <div className='w-full h-screen relative'>
      <Globe />
      <Layout>
        <Container>
          <Header />
        </Container>
      </Layout>
    </div>
  );
};

export default App;
