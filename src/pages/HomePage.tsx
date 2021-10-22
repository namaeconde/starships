import Button from "@mui/material/Button";
import { color } from "../theme";
import Box from "@mui/system/Box";
import Page from "../components/Page";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

function SideBar(): JSX.Element {
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

function Body({ title }: any ): JSX.Element {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start'
    }}>
      <Typography fontWeight={700} fontSize={48}>{title}</Typography>
    </Box>
  )
}

export default function HomePage() {

  return (
    <Page>
      {{
        sidebar: <SideBar />,
        body: <Body title="Starship List"/>,
        footer: <Box> Test </Box>
      }}
    </Page>
  )
}