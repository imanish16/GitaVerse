import './App.css';
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
