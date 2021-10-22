import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { color } from "../theme";
import Box from "@mui/system/Box";
import Page from "../components/Page";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StarshipCard from "../components/StarshipCard";

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

function Body({ title, list }: any ): JSX.Element {
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start'
      }}>
        <Typography fontWeight={700} fontSize={48}>{title}</Typography>
      </Box>
      {
        list && <Box sx={{ width: '100%' }}>
          {
            list.length > 0 ?
                <Grid container rowSpacing={2} columnSpacing={2}>
                {
                  list.map((item: any, _index: number) => {
                    return (
                      <Grid key={_index} item xs={12} sm={6}>
                      <StarshipCard starship={item}/>
                      </Grid>
                    )
                  })
                }
              </Grid> :
              <Typography>No starships found.</Typography>
          }
        </Box>
      }
    </>
  )
}

export default function HomePage() {
  const [ starshipList, setStarshipList ] = useState(null);

  useEffect(() => {
    fetch("https://swapi.dev/api/starships")
    .then(response => response.json())
    .then(data => {
      const { results, next, previous } = data;
      setStarshipList(results);
    })
  }, [])

  return (
    <Page>
      {{
        sidebar: <SideBar />,
        body: <Body title="Starship List" list={starshipList}/>,
        footer: <Box> Test </Box>
      }}
    </Page>
  )
}