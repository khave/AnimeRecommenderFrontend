import React from "react";

const AnimeCard = (props) => {
  const { anime } = props;
  return (
    <div className="anime_card">
      <div className="img_container">
        <a href={anime["MAL Link"]} rel="noreferrer" target="_blank">
          <img src={anime["Image URL"]} alt={anime.title} />
        </a>
        <span className="caption">{anime["Anime Title"]}</span>
      </div>
      <div>
        {/* <p>count: {anime['count']}</p> */}
        {/* <p className="know_more">
              <a href={anime['MAL Link']} rel="noreferrer" target="_blank">
                MAL Link
              </a>
            </p> */}
      </div>
    </div>
  );
};

export default AnimeCard;
