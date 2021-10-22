import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export const StarshipLogo = () => {
  return (
    <Avatar alt="Starship" src="/assets/home_logo.png" sx={{ width: 56, height: 56 }} variant="square"/>
  )
}

export default function Header() {

  return (
    <>
      <StarshipLogo />
    </>
  )
}