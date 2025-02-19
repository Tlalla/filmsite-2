import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./FirstPage.module.css"
const FirstPage=()=>{
    const [list, setList] = useState([]);
    const [searchInput, setSearchInput] = useState("sherlock");
    const [error, setError] = useState("");
    const [searchList, setSearchList] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [favoriteInp, setFavoriteInp] = useState("");

    useEffect(() => {
      fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=feb687d3`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response==="True") {
            const movieInfo = data.Search.map((movie) => ({
                title: movie.Title,
                poster: movie.Poster,
                genre: movie.Genre,
                year: movie.Year,
                imdbID: movie.imdbID,
                isFavorite: false,
              }));
              setList(movieInfo);
              setError("");
          } else {
            setList([]);
            setError("Film not found.");
          }
        })
    }, [searchInput]);
    
    const btw = () => {
        setSearchInput(searchList);
      };
    // const toggleFavorite = (index) => {
    //   setList((prev) =>
    //     prev.map((movie, i) =>
    //       i === index ? { ...movie, isFavorite: !movie.isFavorite } : movie
    //     )
    //   );
    // };
    const toggleFavorite = (index) => {
        const updatedMovies = list.map((movie, i) =>
          i === index ? { ...movie, isFavorite: !movie.isFavorite } : movie
        );
        setList(updatedMovies);
      
        if (!list[index].isFavorite) { 
          setFavorites((prevFavorites) => [
            ...prevFavorites,
            {
              title: list[index].title,
              imdbID: list[index].imdbID,
            },
          ]);
        } else {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.imdbID !== list[index].imdbID)
          );
        }
      };
      const deleteFromList = (imdbID) => {
        setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
        const updatedMovies = list.map((movie) =>
          movie.imdbID === imdbID ? { ...movie, isFavorite: false } : movie 
        );
        setList(updatedMovies);
      };
      const favoritesInp = (e) => {
        setFavoriteInp(e.target.value);
      };
    return (
      <div className="firsts">
        <header style={{display:'flex', justifyContent:'center'}}>
          <h1>Movies - Discover, Watch, Enjoy</h1>
        </header>
        <main><div  className="most" style={{width:'700px', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div className='searchBox' style={{marginTop:'20px', marginBottom: '40px'}}>
            <input 
            style={{height: '26.5px', width: '270px', border: '1.5px solid darkred', borderRadius:'5px', paddingLeft:'5px'}}
              type="text"
              onChange={(e) => setSearchList(e.target.value)}
              placeholder="Search"
              className="firstInput"
            />
            <button style={{height:'29px', width: '60px', border: '1px solid darkred', borderRadius:'3px', marginLeft:'2px'}} onClick={btw}>Search</button>
          </div>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div className={list}>
              {list.map((movie, index) => (
                <div style={{display:'flex', justifyContent:'center', gap:'20px',marginBottom:'20px'}} key={movie.imdbID} className={movie}>
                  <img src={movie.poster} alt={movie.title} style={{width:"250px", borderRadius:'10px'}} />
                  <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'100px', width:'250px', fontFamily:'"Bebas Neue", serify'}}>
                    <h2>{movie.title}</h2>
                    <p>{movie.genre}</p> 
                    {/* !!!!НЕ отображается ????????/*/}
                    <p>{movie.year}</p>
                    <button style={{backgroundColor:'rgb(201, 15, 15)',color:'white', width:'190px', height:'26px'}} onClick={() => toggleFavorite(index)}>
                      {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}</div>
          <div><div style={{border:'2px solid darkred',width:'450px', height:'500px', display:'flex', flexDirection:'column',alignItems:'center', marginTop:'20px', borderRadius:'20px'}} className="favoriteList"><h2 style={{fontFamily:'"Bebas Neue", serify'}}>Your Favorite Movies</h2>
          <ul>
            
            {favorites.map((favorite) => (
              <li style={{marginBottom:'10px'}} key={favorite.imdbID}>
                <div style={{width:'300px', padding:'10px',border:'1px solid darkgray', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}>{favorite.title}
                <button style={{backgroundColor:'darkgray', border:'none', borderRadius: '10px', width:'90px'}} onClick={() => deleteFromList(favorite.imdbID)}>
                  Remove
                </button></div>
              </li>
            ))}
          </ul></div>
          <input
  style={{
    width: "250px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid darkred",
  }}
  type="text"
  placeholder="Enter Favorite List Name"
  onChange={favoritesInp}
/>
<NavLink to="/favorites" style={{ textDecoration: "none" }}>
  <button
    style={{
      backgroundColor: favoriteInp.trim() && favorites.length > 0 ? "#A301D9" : "#D3D3D3",
      borderColor: favoriteInp.trim() && favorites.length > 0 ? "#A301D9" : "#A9A9A9",
      borderRadius: "10px",
      width: "250px",
      height: "35px",
      fontSize: "15px",
      color: "white",
      marginTop: "20px",
      cursor: favoriteInp.trim() && favorites.length > 0 ? "pointer" : "not-allowed",
    }}
    disabled={!favoriteInp.trim() || favorites.length === 0}
  >
    Add Favorite List
  </button>
</NavLink>
</div> 
          
        </main>
      </div>
    );
}
export default FirstPage;