import './App.css';
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';
import VideoPlayer from './components/VideoPlayer';
import requests from './requests';
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams
} from 'react-router-dom'

const SearchPage = () => {
  function LoadSearchResults() {
    let [searchParams] = useSearchParams();
    let queryParameter = searchParams.get("query");
    console.log(queryParameter)
    return (
      <Row 
        title={`Search results for '${queryParameter}'`}
        fetchUrl={requests.searchMoviesOrShows(queryParameter)}
        isLarge
        isSearch  
      />
    )
  }
  return (
    <div className="App">
      <Nav />
      {LoadSearchResults()}
    </div>
  )
};

const MainPage = () => (
  <div className="App">
    <Nav />
    <Banner />
    <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLarge/>
    <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
    <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
    <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
    <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
    <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
    <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
  </div>
);

const PlayerPage = () => (
  <div className="App">
    <Nav />
    <VideoPlayer />
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
          <Route
            path="/search"
            element={<SearchPage/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
