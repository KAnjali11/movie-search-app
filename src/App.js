import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import Favorites from './components/Favorites';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async (e) => {
    e && e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const key = process.env.REACT_APP_OMDB_API_KEY || '861ed311';
      const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (movie) => {
    if (!favorites.some(m => m.imdbID === movie.imdbID)) {
      setFavorites(prev => [movie, ...prev]);
    }
  };
  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(m => m.imdbID !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Movie Search App</h1>
      </header>

      <main className="container">
        <section className="search-section">
          <form onSubmit={searchMovies} className="search-form">
            <input
              aria-label="Search movies"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, e.g. Avengers"
            />
            <button type="submit">Search</button>
          </form>

          {loading ? <p>Loading...</p> : (
            <div className="movies-grid">
              {movies && movies.length ? movies.map(m => (
                <MovieCard key={m.imdbID} movie={m} onFavorite={() => addFavorite(m)} />
              )) : <p>No results</p>}
            </div>
          )}
        </section>

        <aside className="favorites-section">
          <Favorites favorites={favorites} onRemove={removeFavorite} />
        </aside>
      </main>

      <footer className="footer">
        
      </footer>
    </div>
  );
}

export default App;
