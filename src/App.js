import { useState } from "react";
import "./App.css";
import AnimeList from "./component/AnimeList";

const apiRequest = async (query) => {
  const api = 'https://lpsm350e68.execute-api.eu-central-1.amazonaws.com/prod/'
  // Add query parameters
  const url = new URL(api);
  url.query = new URLSearchParams({
    query: query,
  });
  url.top_n = new URLSearchParams({
    top_n: 150,
  });
  // Fetch data
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
  
//   var formData = new FormData();
//   formData.append("query", search);

//   var requestOptions = {
//     method: "POST",
//     body: formData,
//     redirect: "follow",
//   };

//   return await fetch(api, requestOptions).then((response) => response.json());
// }

//const apiRequest = async (search) => {
//  const api = `https://api.jikan.moe/v3/search/anime?q=${search}`;
//  return await fetch(api).then((res) => res.json());
//};

function App() {
  const [animeSearch, setanimeSearch] = useState("");
  const [apiData, setApiData] = useState({});
  const [gotData, setgotData] = useState(true);
  const [dataLoading, setdataLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setgotData(false);
    setdataLoading(true);
    const data = await apiRequest(animeSearch).then((res) => res);
    setApiData(data);
    setdataLoading(false);
  };

  const displayResult = () => {
    if (apiData.status) {
      return <h2>{apiData.message}</h2>;
    } else {
      return <AnimeList results={apiData?.results} />;
    }
  };

  return (
    <div className="app">
      <h1>Anime Recommender</h1>
      <p>Ask for recommendations using the search box below</p>
      <form onSubmit={handleSubmit} className="search">
        <input
          type="text"
          value={animeSearch}
          onChange={(e) => setanimeSearch(e.target.value)}
          placeholder="Search for anime, e.g Pokemon"
        />
        <button
          className="typeReset"
          type="reset"
          onClick={() => setanimeSearch("")}
        >
          X
        </button>
        <button type="submit">Go</button>
      </form>
      {gotData ? (
        <h2>Search for Anime to see results</h2>
      ) : dataLoading ? (
        <h2>Searching...</h2>
      ) : (
        displayResult()
      )}
    </div>
  );
}

export default App;
