import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Page, { Title, scrollToTop } from "../components/Page";
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Pagination, { paginate } from "../components/Pagination";
import { FavoriteStarshipCard } from "../components/StarshipCard";
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
                    <FavoriteStarshipCard key={index} starship={item} />
                  </Box>
                )
              })) : 
              <Box component={Grid} item xs={12} sm={6}>
                <Typography>You have no favorites.</Typography>
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

export default function FavoritePage() {
  const favoriteList = useSelector((state: RootState) => state.favoriteList.value);
  const [ previousPageNumber, setPreviousPage ] = useState(0);
  const [ page, setPage ] = useState(1);
  const [ nextPageNumber, setNextPageNumber] = useState(2);
  const [ paginatedFavoriteList, setPaginatedFavoriteList ] = useState(favoriteList);

  const hasNext = (PAGE_SIZE * page) < favoriteList.length;
  const hasPrevious = (PAGE_SIZE * previousPageNumber) > 0;

  useEffect(() => {
    setPaginatedFavoriteList(paginate(favoriteList, PAGE_SIZE, page));
    setNextPageNumber(page+1);
    setPreviousPage(page-1);
    scrollToTop();
  }, [favoriteList, page])

  const onNextClick = hasNext ? () => {
    setPage(nextPageNumber);
  } : null

  const onPreviousClick = hasPrevious ? () => {
    setPage(previousPageNumber);
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