import Button from "@mui/material/Button";
import { color } from "../theme";
import Box from "@mui/system/Box";
import Page from "../components/Page";
import { makeStyles } from "@mui/styles";

export function SideBar(): JSX.Element {
  const { sidebarButton } = makeStyles(() => ({
    sidebarButton: {
      color:`${color.wild_watermelon}`,
      fontSize: "24px",
      backgroundColor:`${color.racing_green}`,
      borderRadius:"20px",
      textAlign: "center"
    }
  }))();

  return (
    <>
      <Button className={ sidebarButton }>
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