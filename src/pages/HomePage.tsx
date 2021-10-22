import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { color } from "../theme";
import Box from "@mui/system/Box";
import Page from "../components/Page";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StarshipCard from "../components/StarshipCard";
import Pagination from "../components/Pagination";
import Skeleton from '@mui/material/Skeleton';

const SWAPI_STARSHIPS_URL = "https://swapi.dev/api/starships";

function SideBar(): JSX.Element {
  const { sidebarButton } = makeStyles(() => ({
    sidebarButton: {
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
        list ? <Box sx={{ width: '100%' }}>
          {
            list.length > 0 ?
                <Grid container rowSpacing={2} columnSpacing={2}>
                {
                  list.map((item: any, _index: number) => {
                    return (
                      <Grid key={_index} item xs={12} sm={6}>
                      <StarshipCard key={_index} starship={item}/>
                      </Grid>
                    )
                  })
                }
              </Grid> :
              <Typography>No starships found.</Typography>
          }
        </Box> :
        <Box sx={{ width: '100%' }}>
          {
            Array.from(new Array(10)).map((item: number, index: number) => (
              <Skeleton key={index}/>
            ))
          }
        </Box>
      }
    </>
  )
}

async function getStarshipsData(url: string) {
  return await fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    })
}

export default function HomePage() {
  const [ previousUrl, setPreviousUrl ] = useState(null);
  const [ nextUrl, setNextUrl] = useState(SWAPI_STARSHIPS_URL);
  const [ starshipList, setStarshipList ] = useState(null);

  useEffect(() => {
    getStarshipsData(SWAPI_STARSHIPS_URL)
    .then(data => {
      const { results, next, previous } = data;
      setStarshipList(results);
      setNextUrl(next);
      setPreviousUrl(previous);
    })
  }, [])

  const onNextClick = nextUrl ? () => {
    setStarshipList(null);
    getStarshipsData(nextUrl)
      .then(data => {
        const { results, next, previous } = data;
        setStarshipList(results);
        setNextUrl(next);
        setPreviousUrl(previous);
      })
  } : null

  const onPreviousClick = previousUrl ? () => {
    setStarshipList(null);
    getStarshipsData(previousUrl)
      .then(data => {
        const { results, next, previous } = data;
        setStarshipList(results);
        setNextUrl(next);
        setPreviousUrl(previous);
      })   
  } : null

  return (
    <Page>
      {{
        sidebar: <SideBar />,
        body: <Body title="Starship List" list={starshipList}/>,
        footer: starshipList ? <Pagination onNextClick={ onNextClick } onPreviousClick={ onPreviousClick }/> : null
      }}
    </Page>
  )
}