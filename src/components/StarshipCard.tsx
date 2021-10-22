import React, { useState } from "react";
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

export default function StarshipCard({ starship, favorite, showNote }: { starship: any, favorite: boolean, showNote: boolean }): JSX.Element { // TODO: Update starship any to Starship Interface
  const { name, manufacturer, hyperdrive_rating, passengers } = starship;
  const [ isFavorite, setIsFavorite ] = useState(favorite);
  const [ notes, setNotes ] = useState(starship.notes);
  const dispatch = useDispatch();

  const onSetFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromList(starship))
    } else {
      dispatch(addToList(starship));
    }
    setIsFavorite(!isFavorite);
  }

  const handleAddNotes = (event: { target: { value: any; }; }) => {
    const newNote = event.target.value;
    setNotes(newNote);
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
            { isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
          </IconButton>
        </Box>
      </Box>
      {
        showNote && 
        <Box 
          sx={{
            width: 500,
            maxWidth: '100%',
          }} 
          mt={2}
        >
          <TextField 
            fullWidth
            id="notes" 
            label="Add text" 
            variant="outlined" 
            multiline
            rows={4}
            value={notes}
            onChange={handleAddNotes}
          />
        </Box>
      }
    </Box>
  )
}