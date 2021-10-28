import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { color } from "../theme";
import Box from "@mui/system/Box";
import Page, { Title, scrollToTop } from "../components/Page";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StarshipCard from "../components/StarshipCard";
import Pagination from "../components/Pagination";
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom'

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
    <Link to="/favorites" style={{ textDecoration: 'none' }} className="button muted-button">
      <Button className={ sidebarButton }>View favorites</Button>
    </Link>
  )
}

function Body({ title, list }: any ): JSX.Element {
  return (
    <>
      <Title>{title}</Title>
      <Box container rowSpacing={2} columnSpacing={2} component={Grid}>
        {
          list ? 
            list.length > 0 ?
              (list.map((item: any, index: number) => {
                return (
                  <Box component={Grid} key={index} item xs={12} sm={6}>
                    <StarshipCard key={index} starship={item}/>
                  </Box>
                )
              })) : 
              <Box component={Grid} item xs={12} sm={6}>
                <Typography>No starships meant to fly.</Typography>
              </Box>
            : 
              Array.from(new Array(10)).map((item: number, index: number) => (
                <Box component={Grid} key={index} item xs={12} sm={6} >
                  <Skeleton key={index} sx={{ borderRadius:2 }} variant="rectangular" width="100%">
                    <div style={{ paddingTop: '57%' }} />
                  </Skeleton>
                </Box>
              ))
        }
      </Box>
    </>
  )
}

async function getStarshipsData(url: string) {
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .catch((error) => {
      console.log(error)
      return { results: [], next: null, previous: null }
    })
}

export default function HomePage() {
  const [ page, setPage ] = useState(1);
  const [ previousPage, setPreviousPage ] = useState(page-1);
  const [ nextPage, setNextPage] = useState(page+1);
  const [ starshipList, setStarshipList ] = useState<Array<any> | null>(null);

  useEffect(() => {
    getStarshipsData(`${SWAPI_STARSHIPS_URL}/?page=${page}`)
      .then(data => {
        const { results, next, previous } = data;
        setStarshipList(results);
        setNextPage(next ? page+1 : -1);
        setPreviousPage(previous ? page-1 : -1);
        scrollToTop();
      })
  }, [page])

  const onNextClick = nextPage > 0 ? () => {
    setStarshipList(null);
    setPage(nextPage);
  } : null

  const onPreviousClick = previousPage > 0 ? () => {
    setStarshipList(null);
    setPage(previousPage);   
  } : null

  return (
    <Page>
      {{
        sidebar: <SideBar />,
        body: <Body title="Starship List" list={starshipList}/>,
        footer: starshipList && starshipList.length > 0 ? <Pagination onNextClick={ onNextClick } onPreviousClick={ onPreviousClick }/> : null
      }}
    </Page>
  )
}