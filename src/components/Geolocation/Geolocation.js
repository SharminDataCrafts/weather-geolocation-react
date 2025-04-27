import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import mapboxgl from 'mapbox-gl';

const Geolocation = () => {
    const MAP_Token = `pk.eyJ1Ijoic2hhcm1pbi0xMjMiLCJhIjoiY20wMG1hNzlrMTF4dTJsb3E1aThkZ2Z3ciJ9.t6xd4A1iwqFqcx7EoCDJzA`
    const {inp} = useParams();
    // console.log(inp);
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const [name, setName] = useState();

useEffect(()=>{
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${inp}&proximity=ip&access_token=${MAP_Token}`;
    fetch(url)
    .then(res=>{
        if (!res.ok) {
            console.error('Error with the API request:', res.statusText);
            return;
          }
        return res.json()
        })
    .then(data=>{
            const coordinates = data.features[0]?.geometry?.coordinates;
            const name = data.features[1]?.properties?.name;
            setName(name)
            // console.log(data);
            // console.log(coordinates);
            if (mapRef.current) return;
            mapRef.current = new mapboxgl.Map({
              container: mapContainerRef.current,
              style: 'mapbox://styles/mapbox/streets-v11',
              center: coordinates,
              accessToken: MAP_Token,
              zoom: 5
            });

           new mapboxgl.Marker({
                color: "#DC143C",
                draggable: true
            }).setLngLat(coordinates)
                .addTo(mapRef.current);  

        return () => {
              mapRef.current.remove()
            }
        })
    },[inp])

    return (
        <div style={{display:'block', width:'100%', textAlign:'center'}}>
            <h3>{name}</h3>
             <div id='map-container' ref={mapContainerRef} style={{ width: '50%', height: '500px', margin:'auto', border:'1px solid blue', borderRadius:'5px'}}/>
        </div>
    );
};

export default Geolocation;