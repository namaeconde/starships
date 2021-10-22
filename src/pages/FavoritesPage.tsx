import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Page from "../components/Page";
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Pagination from "../components/Pagination";
import StarshipCard from "../components/StarshipCard";
import { useState, useEffect } from "react";

const PAGE_SIZE = 10;

function Body({ title, list }: any ): JSX.Element {
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        my:3
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
                      <StarshipCard key={_index} starship={item} favorite={true} showNote={true}/>
                      </Grid>
                    )
                  })
                }
              </Grid> :
              <Typography>No favorites found.</Typography>
          }
        </Box> :
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            {
              Array.from(new Array(10)).map((item: number, index: number) => (
                <Grid key={index} item xs={12} sm={6}>
                  <Skeleton key={index}/>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      }
    </>
  )
}

function paginate(array: Array<any>, pageSize: number, pageNumber: number): Array<any> {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export default function FavoritePage() {
  const favoriteList = useSelector((state: RootState) => state.favoriteList.value);
  const [ previousPageNumber, setPreviousPage ] = useState(0);
  const [ nextPageNumber, setNextPageNumber] = useState(2);
  const [ paginatedFavoriteList, setPaginatedFavoriteList ] = useState(favoriteList);

  useEffect(() => {
    setPaginatedFavoriteList(paginate(favoriteList, PAGE_SIZE, nextPageNumber-1));
  }, [favoriteList, nextPageNumber])

  const onNextClick = (PAGE_SIZE * (nextPageNumber-1)) < favoriteList.length ? () => {
    setPaginatedFavoriteList(paginate(favoriteList, PAGE_SIZE, nextPageNumber));
    setNextPageNumber(nextPageNumber+1);
    setPreviousPage(nextPageNumber);
  } : null

  const onPreviousClick = (PAGE_SIZE * (previousPageNumber-1)) > 0 ? () => {
    setPaginatedFavoriteList(paginate(favoriteList, PAGE_SIZE, previousPageNumber));
    setNextPageNumber(previousPageNumber);
    setPreviousPage(previousPageNumber-1);
  } : null

  return (
    <Page>
      {{
        body: <Body title="Favorites" list={paginatedFavoriteList}/>,
        footer: favoriteList.length > 0 ? <Pagination onNextClick={ onNextClick } onPreviousClick={ onPreviousClick }/> : null
      }}
    </Page>
  )
}