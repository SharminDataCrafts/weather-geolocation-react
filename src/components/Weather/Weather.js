import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Weather = () => {
    const {inp} = useParams();
    // console.log(inp);
    const [weatherInfo, setWeatherInfo] = useState([]);

    const API_key = '2b82c13682ce3cc217ff7359e03e192d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${API_key}`;

    useEffect(()=>{
      return async()=>{
        try{
            const response = await fetch(url);
            const data = await response.json();
            setWeatherInfo(data);

           } catch(e){
            // console.log(e);
            throw e;
           }
        }
      },[inp]);
    //   console.log(weatherInfo);

      const weatherInKelvin = weatherInfo?.main?.temp;
      const tempInCelcius = (weatherInKelvin-273).toFixed(2);
    //   console.log(tempInCelcius);

    function formattedTimeStamp(timestamp,timezoneOffset){
        const localTimestamp = (timestamp + timezoneOffset) * 1000;
        const localDate  = new Date(localTimestamp);
        const timeString  = localDate.toLocaleTimeString();
        return timeString;
    }

    const icon = weatherInfo?.weather?.length > 0?  weatherInfo?.weather[0].icon:null;
    const imgSrc =icon?`https://openweathermap.org/img/wn/${icon}@2x.png`:'';
    // console.log(imgSrc)

    return (
        <div>
            <Typography gutterBottom variant="h4" component="div" sx={{m:5}}>
                   Weather Information
            </Typography>
            <Card sx={{ maxWidth: 345, margin:'auto' , mt:5 }}>
               
                <Box component="img" 
                    src={imgSrc}
                    alt='weather icon'>
                </Box>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {weatherInfo.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   Temperature: {tempInCelcius} ℃
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   Description: {weatherInfo?.weather?.length > 0?  weatherInfo?.weather[0].description:'No description available'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   Sunrise at: {formattedTimeStamp(0,weatherInfo?.sys?.sunrise)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   Sunset at: {formattedTimeStamp(0,weatherInfo?.sys?.sunset)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   TimeZone: {formattedTimeStamp(1745623763, weatherInfo?.timezone)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   Humidity: {weatherInfo?.main?.humidity}
                </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Weather;