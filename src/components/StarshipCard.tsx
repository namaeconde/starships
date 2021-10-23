import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import {color} from '../theme';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarshipImage from '../images/starship.png';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { addToList, removeFromList, updateFavorite } from '../redux/favoriteListSlice';
import LightTooltip from "./LightTooltip";
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export const FavoriteStarshipCard = ({ starship } : { starship: any}) => {
  return <StarshipCard starship={starship} showNote={true}/>
}

export default function StarshipCard({ starship, showNote }: { starship: any, showNote?: boolean }): JSX.Element { // TODO: Update starship any to Starship Interface
  const { name, manufacturer, hyperdrive_rating, passengers, notes } = starship;
  const [ notesUpdate, setNotesUpdate ] = useState(notes || "");
  
  const favoritesByName = (useSelector((state: RootState) => state.favoriteList.value)).map(({ name }) => name);
  const isFavorite = favoritesByName.includes(name);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notesUpdate !== notes) {
      setNotesUpdate(notes || "");
    }
  }, [notes, notesUpdate])

  const onSetFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromList(name));
    } else {
      dispatch(addToList({ name, manufacturer, hyperdrive_rating, passengers, notes }));
    }
  }

  const handleAddNotes = (event:any) => {
    const newNote = event.target.value;
    dispatch(updateFavorite({...starship, notes: newNote }));
  }

  return (
    <Box sx={{ p:3, backgroundColor:`${color.midnigt_moss}`, borderRadius:2 }}>
      <Box container component={Grid}>
        <Box item xs={8} component={Grid}>
          <LightTooltip title={name}>
            <Typography noWrap fontSize={24} fontWeight={700}>{name}</Typography>
          </LightTooltip>
          <LightTooltip title={manufacturer}>
          <Typography noWrap fontSize={18}>{manufacturer}</Typography>
          </LightTooltip>
          <Rating name="read-only" value={Number(hyperdrive_rating)} precision={0.5} readOnly />
          <Typography fontSize={18}>Passengers: {passengers}</Typography>
        </Box>
        <Box item xs={4} sx={{ backgroundImage: `url(${StarshipImage})`, borderRadius:2 }} component={Grid}>
          <IconButton color="primary" sx={{ float:"right" }} onClick={onSetFavorite}>
            { isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
          </IconButton>
        </Box>
      </Box>
      {
        showNote && 
          <Box sx={{ maxWidth: '100%' }} mt={2}>
            <TextField 
              fullWidth
              id="notes" 
              label="Add text" 
              variant="outlined" 
              multiline
              rows={4}
              value={notesUpdate}
              onChange={handleAddNotes}
            />
          </Box>
        }
    </Box>
  )
}