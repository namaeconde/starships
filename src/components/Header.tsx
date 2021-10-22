import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';

export const StarshipLogo = () => {
  return (
    <Avatar alt="Starship" src="/assets/home_logo.png" sx={{ width: 105, height: 79 }} variant="square"/>
  )
}

export default function Header() {

  return (
    <Link to="/">
      <StarshipLogo />
    </Link>
  )
}