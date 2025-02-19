import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import FirstPage from './Components/FirstPage';
import SecondPage from './Components/SecondPage';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("sherlock");
  const [searchList, setSearchList] = useState("");
  const toggleFavorite = (imdbID) => {
    const updatedList = list.map((movie) =>
      movie.imdbID === imdbID
        ? { ...movie, isFavorite: !movie.isFavorite }
        : movie
    );
    setList(updatedList);

    if (updatedList.find((movie) => movie.imdbID === imdbID).isFavorite) {
      setFavorites((prevFavorites) => [
        ...prevFavorites,
        updatedList.find((movie) => movie.imdbID === imdbID),
      ]);
    } else {
      setFavorites(favorites.filter((movie) => movie.imdbID !== imdbID));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <FirstPage
            list={list}
            setList={setList}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchList={searchList}
            setSearchList={setSearchList}
            favorites={favorites}
            favoritestwo={setFavorites}
            toggleFavorite={toggleFavorite}
          />
        } />
        <Route path="/favorites" element={
          <SecondPage
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        } />
      </Routes>
    </Router>
  );
}


export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import FirstPage from './Components/FirstPage';
// import SecondPage from './Components/SecondPage';

// function App() {
//   const [favorites, setFavorites] = useState([]);
//   const [list, setList] = useState([]);
//   const [searchInput, setSearchInput] = useState("sherlock");
//   const [searchList, setSearchList] = useState("");

//   const toggleFavorite = (imdbID) => {
//     const updatedList = list.map((movie) =>
//       movie.imdbID === imdbID
//         ? { ...movie, isFavorite: !movie.isFavorite }
//         : movie
//     );
//     setList(updatedList);

//     if (updatedList.find((movie) => movie.imdbID === imdbID).isFavorite) {
//       setFavorites((prevFavorites) => [
//         ...prevFavorites,
//         updatedList.find((movie) => movie.imdbID === imdbID),
//       ]);
//     } else {
//       setFavorites(favorites.filter((movie) => movie.imdbID !== imdbID));
//     }
//   }}; export default App;