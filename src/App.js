import { useState, useEffect } from "react";
import "./App.css";
import AnimeList from "./component/AnimeList";

const apiRequest = async (query) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch("https://lpsm350e68.execute-api.eu-central-1.amazonaws.com/prod/?query=" + query + "&top_n=150", requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error => console.log('error', error));
  
  // return await fetch("https://lpsm350e68.execute-api.eu-central-1.amazonaws.com/prod/?query=" + query + "&top_n=150", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
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
  const [index, setIndex] = useState(0);
  const placeholderText = [
    "An old but classic anime",
    "Protagonist is a singer and is singing a lot during the anime",
    "Overpowered protagonist",
    "Anime with clever protagonist",
    "Tennis where the protagonist is really good at it",
    "Silent and cool main protagonist",
    "Crime drama",
    "Psychological anime",
    "Fantasy anime with a strong protagonist set in a fantasy world",
    "Protagonist is immortal",
    "Anime about vampires",
    "Anime that teaches you life lessons like great teacher onizuka",
    "Ensemble cast that are well developed and set in a big urban city setting",
    "Gambling",
    "Gender-bender",
    "Horror anime that is really scary",
    "Wholesome yuri",
    "Really brutal, gory, terrifying zombie anime"
  ]

  useEffect(() => {
    const timer = () => {
      setIndex(prevIndex => {
        if(prevIndex === placeholderText.length - 1){
          return 0;
        } 
        return prevIndex + 1;
      })
    };
    setInterval(timer, 5000);
    
    //cleanup function in order clear the interval timer
    //when the component unmounts
    return () => { clearInterval(timer); }
  }, [placeholderText.length]);


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
          id="inputID"
          type="text"
          value={animeSearch}
          onChange={(e) => setanimeSearch(e.target.value)}
          placeholder={placeholderText[index]}
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
