import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import {color} from '../theme'

export default function StarshipCard({ starship }: { starship: any}): JSX.Element { //TODO: Update starship any to Starship Interface
  const { name, manufacturer, hyperdrive_rating, passengers } = starship;

  return (
    <Paper sx={{ p:3, backgroundColor:`${color.midnigt_moss}`, borderRadius:2 }}>
      <Typography fontSize={24} fontWeight={700}>{name}</Typography>
      <Typography noWrap fontSize={18}>{manufacturer}</Typography>
      <Rating name="read-only" value={Number(hyperdrive_rating)} readOnly />
      <Typography fontSize={18}>Passengers: {passengers}</Typography>
    </Paper>
  )
}