import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { NumberOfEvents } from './components/NumberOfEvents';
import { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';
import './App.css';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenreChart from './components/EventGenreChart';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState(['See all cities']);
  const [infoAlert, setInfoAlert] = useState(''); // represents the text that will be displayed in the infoalert
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity == 'See all cities' ? // putting strict equality here makes the test fail
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    if (navigator.onLine) {
      // set the warning alert message to an empty string ''
      setWarningAlert('');
    } else {
      // set the warning alert message to a non-empty string
      setWarningAlert('Warning: you are currently offline. The data loaded has been retrieved from your cache file, and thus may not be up to date.')
    }
    fetchData();
  }, [currentCity, currentNOE]);


  return (
    <div className="App">
      <div className="background-container">
        <div className='background-colour'></div>
        <div className='circle1'></div>
        <div className='circle2'></div>
        <div className='circle3'></div>
        <div className='circle4'></div>

      </div>
      <div id="input-container">
        <h1>Meet App</h1>
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} currentNOE={currentNOE} setCurrentNOE={setCurrentNOE}/>
        <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      </div>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <div className="charts-container">
        <EventGenreChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;
