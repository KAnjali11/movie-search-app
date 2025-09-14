import React from 'react';

const MovieCard = ({ movie, onFavorite }) => {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
  return (
    <div className="movie-card" role="article" aria-label={movie.Title}>
      <img src={poster} alt={movie.Title} />
      <h3 style={{fontSize:14, margin:'6px 0'}}>{movie.Title}</h3>
      <div style={{fontSize:12, color:'#666'}}>{movie.Year}</div>
      <button onClick={onFavorite} aria-label={`Add ${movie.Title} to favorites`}>Add to Favorites</button>
    </div>
  );
};

export default MovieCard;
