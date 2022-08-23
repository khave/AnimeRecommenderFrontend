import AnimeCard from "./AnimeCard";

const AnimeList = ({ results }) => {
  return (
    <div className="anime_container">
      {results.map((anime, index) => (
        <AnimeCard key={index} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeList;
