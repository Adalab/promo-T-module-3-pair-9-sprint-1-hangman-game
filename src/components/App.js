// Fichero src/components/App.js
import '../styles/App.css';
import '../styles/_reset.scss';
import '../styles/_loading.scss';
import '../styles/_letters.scss';
import '../styles/_instructions.scss';
import '../styles/_header.scss';
import '../styles/_form.scss';
import '../styles/_footer.scss';
import '../styles/_dummy.scss';
import '../styles/_app.scss';
import { useState, useEffect } from 'react';


function App() {
  let [numberOfErrors, setErrors] = useState(0);
  const handleClick = (ev) => {
    ev.preventDefault();
    setErrors (numberOfErrors + 1);
    console.log (numberOfErrors);
  }

  let [userLetters, setUserLetters] = useState ('');
  let [lastLetter, setLastLetter] = useState('');
  const handleInputChange = (event) => {
    event.preventDefault();
    const inputText = event.target.value;
    let lastCharacter = inputText.charAt(inputText.length - 1);
    setLastLetter(lastCharacter);
    setUserLetters(lastCharacter);
    /*if (esLetraValida(lastCharacter)) {
      setLastLetter(lastCharacter);
    } else {
      setErrors(numberOfErrors + 1);
    }

    /*const esLetraValida = (letra) => {
    const alfabeto_espanol = "abcdefghijklmnñopqrstuvwxyzáéíóúü";
    return alfabeto_espanol.includes(letra.toLowerCase());
    console.log (esLetraValida);*/
  
   }
  
   /*let [word, setWord] = useState('katakroker');
   const renderSolutionLetters = () => {
    const wordLetters = word.split('');
     return wordLetters.map ((letter) => {
      //return (<li className="letter"></li>)
      if (word.includes(lastLetter)) {
        return (<li className="letter">{letter}</li>)
      }
     })
*/

//Obtener palabra aleatoria de una API
let [word, setWord] = useState(''); 
const url = 'https://dev.adalab.es/api/random/word';
useEffect(() => {
    const handleFetchData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.word) {
            setWord(data.word);
          } else {
            throw new Error('Error al obtener la palabra');
          }
        })
        .catch((error) => {
          console.error('Error de red:', error);
        });
    };

    handleFetchData();
  }, []);


return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2> 
            <ul className="letters">
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
            </ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">Escribe una letra:</label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onChange={handleInputChange}
            />
            <input type='submit' value='Incrementar' onClick = {handleClick}></input>
          <div>
          <h2>Palabra aleatoria: {word} </h2>
          </div>
          </form>
        </section>
        <section className={`dummy error-${numberOfErrors}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
      </main>
    </div>
  );

} export default App;
