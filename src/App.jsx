import React,{useState, useEffect} from 'react';
import searchIcon from './Assets/search.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState(null);
  const [definitions, setDefinitions] = useState([]);
  const [sinonimos, setSinonimos] = useState([]);
  const [antonimos, setAntonimos] = useState([]);

  useEffect(() => {
    if(search !== null){
      axios.get(`http://sesat.fdi.ucm.es:8080/servicios/rest/definicion/json/${search}`)
      .then(response => {
        console.log(Error);
        const results = response.data.definiciones;
        console.log(results);
        setDefinitions(results);
      })
      axios.get(`http://sesat.fdi.ucm.es:8080/servicios/rest/sinonimos/json/${search}`)
      .then(response => {
        console.log(Error);
        const results = response.data.sinonimos;
        console.log(results);
        setSinonimos(results);
      })
      axios.get(`http://sesat.fdi.ucm.es:8080/servicios/rest/antonimos/json/${search}`)
      .then(response => {
        console.log(Error);
        const results = response.data.antonimos;
        console.log(results);
        setAntonimos(results);
      })
    }
  },[search]);

  return (
    <div className="App">
      <div className='search'>
        <input className='searchInput' id='search' placeholder='Search'/>
        <div className="searchButton" onClick={() => setSearch(document.getElementById('search').value)}>
            <img className="searchIcon" src={searchIcon} alt="2"/>
        </div>
      </div>
      
      {search!==null?
      <div>
        <div className='definitions'>
          {definitions.map((elem,index) => {return <Definition key={index} definicion={elem.definicion} index={index}/>})}
        </div>
        <div className='extra'>
          <div className='sinonimos'>
            {sinonimos.map((elem,index) => {return <SinAnt key={index} word={elem.sinonimo} setSearch={setSearch}/>})}
          </div>
          <div className='antonimos'>
            {antonimos.map((elem,index) => {return <SinAnt key={index} word={elem.antonimo} setSearch={setSearch}/>})}
          </div>
        </div>
      </div>:null
      }
    </div>
  );
}

function Definition(props){
  const {index,definicion} = props;
  
  return(
    <div className='definition'>
      <span>{`${index}. ${definicion}`}</span>
    </div>
  );
}

function SinAnt(props){
  const {word,setSearch} = props;

  return(
    <div className='sinant' onClick={() => {setSearch(word)}}>
      <span>{word}</span>
    </div>
  );
  
}

export default App;
