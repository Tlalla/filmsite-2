import { NavLink } from 'react-router-dom';
const SecondPage = (props) => {
    return (
        <div>
            <header>
                <h1 style={{display:'flex',justifyContent:'center'}}>Favorite Movies</h1>
            </header>
            <main>

                <div>
                    <h1 style={{
                        marginTop: "5px"
                    }}>{props.favorites}</h1>
                    <div style={{
                        height: "400px",
                        overflow: "auto"
                    }}>
                        {props.favorites.map((favorite, index) => (
                            <div key={index} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "35vw",
                                marginLeft: "2.5vw",
                                marginBottom: "10px",
                            }}>
                                <p>{favorite.title}</p>
                                <button
                                    style={{
                                        backgroundColor: "#A301D9",
                                        borderColor: "#A301D9",
                                        borderRadius: "10px",
                                        width: "100px",
                                        height: "35px",
                                        fontSize: "15px",
                                        color: "white",
                                    }}
                                >
                                    <a
                                        href={`https://www.imdb.com/title/${favorite.imdbID}/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "white", textDecoration: "none" }}
                                    >
                                        IMDb
                                    </a>
                                </button>
                                <NavLink to='/'>
                                    <button
                                        onClick={() => {
                                            props.toggleFavorite(favorite.imdbID);
                                        }}
                                        style={{
                                            backgroundColor: "#A301D9",
                                            borderColor: "#A301D9",
                                            borderRadius: "10px",
                                            width: "100px",
                                            height: "35px",
                                            fontSize: "15px",
                                            color: "white",
                                        }}
                                    >
                                        Remove from Favorites
                                    </button>
                                </NavLink>
                            </div>
                        ))}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default SecondPage;