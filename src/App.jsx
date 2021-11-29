import React from 'react';
import Container from './components/Container';
import Globe from './components/Globe';
import Header from './components/Header';
import LayerControl from './components/LayerControl';
import LayerController from './components/LayerController';
import Layout from './components/Layout';

const App = () => {
  return (
    <div className='w-full h-screen relative'>
      <Globe />
      <Layout>
        <Container>
          <Header />
          <LayerController />
        </Container>
      </Layout>
    </div>
  );
};

export default App;
