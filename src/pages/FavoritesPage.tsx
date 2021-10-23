import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Page, { Title } from "../components/Page";
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Pagination, { paginate } from "../components/Pagination";
import StarshipCard from "../components/StarshipCard";
import { useState, useEffect } from "react";

const PAGE_SIZE = 10;

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
                    <StarshipCard key={index} starship={item} favorite={true} showNote={true}/>
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

export default function FavoritePage() {
  const favoriteList = useSelector((state: RootState) => state.favoriteList.value);
  const [ previousPageNumber, setPreviousPage ] = useState(0);
  const [ nextPageNumber, setNextPageNumber] = useState(2);
  const [ paginatedFavoriteList, setPaginatedFavoriteList ] = useState(favoriteList);

  const hasNext = (PAGE_SIZE * (nextPageNumber+1)) < favoriteList.length;
  const hasPrevious = (PAGE_SIZE * (previousPageNumber-1)) > 0;

  useEffect(() => {
    setPaginatedFavoriteList(paginate(favoriteList, PAGE_SIZE, nextPageNumber-1));
  }, [favoriteList, nextPageNumber])

  const onNextClick = hasNext ? () => {
    setPaginatedFavoriteList(paginate(favoriteList, PAGE_SIZE, nextPageNumber));
    setNextPageNumber(nextPageNumber+1);
    setPreviousPage(nextPageNumber);
  } : null

  const onPreviousClick = hasPrevious ? () => {
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