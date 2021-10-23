import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { color } from "../theme";
import Box from "@mui/system/Box";
import Page, { Title } from "../components/Page";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StarshipCard from "../components/StarshipCard";
import Pagination from "../components/Pagination";
import Skeleton from '@mui/material/Skeleton';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
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
  const favoriteList = useSelector((state: RootState) => state.favoriteList.value);
  const favoritesByName = favoriteList.map(({ name }) => name);
  
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
                    <StarshipCard key={index} starship={item} favorite={favoritesByName.includes(item.name)} showNote={false}/>
                  </Box>
                )
              })) : <Typography>No data found.</Typography>
            : 
              Array.from(new Array(10)).map((item: number, index: number) => (
                <Box component={Grid} key={index} item xs={12} sm={6}>
                  <Skeleton key={index}/>
                </Box>
              ))
        }
      </Box>
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