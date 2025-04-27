import './App.css';
import {BrowserRouter, Routes, Route } from "react-router"
import Main from './components/Main/Main';
import NotFound from './components/NotFound/NotFound';
import Weather from './components/Weather/Weather';
import Geolocation from './components/Geolocation/Geolocation';
import { createContext, useState } from 'react';

export const PlaceContext = createContext();

function App() {
  const [place, setPlace] = useState('')
  return (
   <div className='App'>
      <PlaceContext.Provider value={ [place, setPlace]}>
        <BrowserRouter>
        <Routes>
          <Route path='/main' element={<Main/>} />
          <Route exact path='/' element={<Main/>} />
          <Route exact path='/weather/:inp' element={<Weather/>} />
          <Route exact path='/geolocation/:inp' element={<Geolocation/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </PlaceContext.Provider>
   </div>
  );
}

export default App;
