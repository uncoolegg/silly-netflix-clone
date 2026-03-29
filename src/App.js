import './App.css';
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';
import requests from './requests';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

const MainPage = () => (
  <div className="App">
    <Nav />
    <Banner />
    <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} contentType={"tv"}  isLarge/>
    <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
    <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
    <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} contentType={"movie"} />
    <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} contentType={"movie"} />
    <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} contentType={"movie"} />
    <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} contentType={"movie"} />
  </div>
);

const PlayerPage = () => (
  <div className="App">
    <Nav />
    <h1>Test</h1>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage/>}
          />
          <Route
            path="/player"
            element={<PlayerPage/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
