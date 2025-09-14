import React from 'react';

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div className="favorites-list" aria-live="polite">
      <h3 style={{marginTop:0}}>Favorites ({favorites.length})</h3>
      {favorites.length === 0 && <p style={{color:'#666'}}>No favorites yet.</p>}
      {favorites.map(f => (
        <div key={f.imdbID} className="fav-item">
          <img src={f.Poster && f.Poster !== 'N/A' ? f.Poster : 'https://via.placeholder.com/80x120?text=No+Image'} alt={f.Title} />
          <div style={{fontSize:13}}>
            <div style={{fontWeight:600}}>{f.Title}</div>
            <div style={{fontSize:12, color:'#666'}}>{f.Year}</div>
          </div>
          <button onClick={() => onRemove(f.imdbID)} aria-label={`Remove ${f.Title}`}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
