import './App.css';
import Navbar from './components/Navbar';
import Upload from './components/Upload';
import Footer from './components/Footer';
function App() {
  return (
    <main className='bg-white' style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className='mt-20 h-full'>
        <Upload />
      </div>
      <Footer />
    </main>
  );
}

export default App;
