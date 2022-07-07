import React, { useState, useEffect } from "react";
import styles from "./movielist.module.css";
import axios from "axios";
import ReactTooltip from "react-tooltip";

export default function MovieList() {
  const [list, setList] = useState([]);
  const [fav, setFav] = useState(["favorie movies"]);

  const getMovies = () => {
    const api_key = `958c8748f16edc21db9584ce711ad469`;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`;
    axios
      .get(url)
      .then(function(response) {
        setList(response.data.results.map(a => a));
      })
      .catch(function(err) {
        setList(err);
      });
  };
  useEffect(() => {
    getMovies();
  }, []);
  const handleClick = e => {
    const l = e.target.innerText;
    setFav({ ...l });
  };
  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.header}>Movie List</h1>
        <div className={styles.movdiv}>
          {list.map(a => (
            <ul key={a.id} className={styles.ul}>
              <li onClick={handleClick} className={styles.movli}>
                {a.title}
                <button data-tip data-for="fav" data-type="info" className={styles.fav}>
                  💛
                </button>
                <ReactTooltip id="fav" place="left" effect="solid">
                  Add to Favorites
                </ReactTooltip>
              </li>
            </ul>
          ))}
        </div>
        <div>
          <h3>Favorites</h3>
          {/*fav.map(f => (
            <p>{f}</p>
          ))*/}
        </div>
      </div>
    </>
  );
}
