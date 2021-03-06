import './App.css';
import {
  Switch,Route
} from 'react-router-dom';
import React,{ Suspense ,lazy} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
const Home=lazy(()=>import('./pages/Home'));
const About=lazy(()=>import('./pages/About'));
const History=lazy(()=>import('./pages/History'));
const Login=lazy(()=>import('./pages/Login'));
const Register=lazy(()=>import('./pages/Register'));
const test=lazy(()=>import('./pages/test'));

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/history" component={History} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/test" component={test} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
