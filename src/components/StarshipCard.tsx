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
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function StarshipCard({ starship }: { starship: any}): JSX.Element { // TODO: Update starship any to Starship Interface
  const { name, manufacturer, hyperdrive_rating, passengers } = starship;
  const [ isFavorite, setIsFavorite ] = useState(false); // TODO: Update to get data from redux

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
          <IconButton color="primary" sx={{ float:"right" }} onClick={() => setIsFavorite(!isFavorite)}>
            { isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}