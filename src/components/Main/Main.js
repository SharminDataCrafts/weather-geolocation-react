import React, { useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router";
import { PlaceContext } from '../../App';
import { FormLabel } from '@mui/material';

const Main = () => {
    const  [place, setPlace] = useContext(PlaceContext);
    // const[inp, setInp] = useState('');

    const handleOnchange=(e)=>{
        setPlace(e.target.value);
    }
    // console.log(place);

    return (
        <div style={{margin: 'auto'}} >
            <h1>Weather & Geolocation Api</h1>  
           <FormLabel>
           <TextField id="outlined-basic" label="Place" variant="outlined" required onChange={(e)=>handleOnchange(e)}/>
           <Box component="section" sx={{ p: 2 }} >
                <Link to={`/weather/${place}`} ><Button variant="contained"  sx={{ m: 2 }} >Search Weather</Button></Link>
                <Link to={`/geolocation/${place}`}><Button variant="contained"  sx={{ m: 2 }}>Search Geolocation</Button></Link>
           </Box>
           </FormLabel>
        </div>
    );
};

export default Main;