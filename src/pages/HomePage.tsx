import Button from "@mui/material/Button";
import { color } from "../theme";
import Box from "@mui/system/Box";
import Page from "../components/Page";

export function SideBar(): JSX.Element {
  return (
    <>
      <Button
        style={{ 
          color:`${color.wild_watermelon}`,
          backgroundColor:`${color.racing_green}`,
          borderRadius:"20px"
        }}>
          View Favorites
      </Button>
    </>
  )
}

export default function HomePage() {

  return (
    <Page>
      {{
        sidebar: <SideBar />,
        body: <Box> Test </Box>,
        footer: <Box> Test </Box>
      }}
    </Page>
  )
}