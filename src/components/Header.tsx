import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { color } from '../theme';

export const StarshipLogo = () => {
  return (
    <Avatar alt="Starship" src="/assets/home_logo.png" sx={{ width: 56, height: 56 }} variant="square"/>
  )
}

export default function Header({ fixedHeader }: { fixedHeader: Boolean}) {
  const position = fixedHeader ? "fixed" : "static";

  return (
    <AppBar elevation={0} position={position} style={{ backgroundColor: color.black_pearl }}>
      <Box 
        height={80} 
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl={{ xs: 2, sm: 3 }}
        pr={{ xs: 2, sm: 3 }}>
        <StarshipLogo />
        <Button
          style={{ 
            color:`${color.wild_watermelon}`,
            backgroundColor:`${color.racing_green}`,
            borderRadius:"20px"
          }}>
            View Favorites
        </Button>
      </Box>
    </AppBar>
  )
}