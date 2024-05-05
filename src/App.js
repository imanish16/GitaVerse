import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <>

      <Navbar />
      <main>

        < AppRouter />
      </main>
      <Footer />

    </>
  )
}

export default App;
