import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Page from "../components/Page";
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Pagination from "../components/Pagination";

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
                      <Typography>Favorite</Typography>
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

export default function FavoritePage() {
  const favoriteList = useSelector((state: RootState) => state.favoriteList.value);

  const onNextClick = () => {
    console.log("load next 10 favorites");
  }

  const onPreviousClick = () => {
    console.log("load previous 10 favorites");
  }

  return (
    <Page>
      {{
        body: <Body title="Favorites" list={favoriteList}/>,
        footer: favoriteList.length > 0 ? <Pagination onNextClick={ onNextClick } onPreviousClick={ onPreviousClick }/> : null
      }}
    </Page>
  )
}