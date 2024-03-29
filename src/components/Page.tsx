import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { ReactNode } from "react";
import Header from "./Header";

interface Props {
  children: {
    sidebar?: ReactNode
    body: ReactNode
    footer?: ReactNode  }
}

export const Title = ({ children } : { children: any}) => {
  return (
    <Box sx={{ display:'flex', justifyContent:'flex-start', my:3 }}>
      <Typography fontWeight={700} fontSize={48}>{children}</Typography>
    </Box>
  )
}

export function scrollToTop() {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
}

export default function Page(props: Props) {
  const { sidebar, body, footer } = props.children;

  const styles = makeStyles(() => ({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    main: {
      display: "flex",
      flexDirection: "column"
    }
  }))();

  return (
    <Box width="100%">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: 
            `"header sidebar"
            "main main"
            "footer footer"`,
        }}
      >
        <Box sx={{ gridArea: 'header' }}>
          <Header />
        </Box>
        <Box sx={{ gridArea: 'sidebar' }} mx={{ xs: 3, sm: 8 }} my={{ xs: 0, sm: 3 }} className={ styles.container }>
          { sidebar ? sidebar : null }
        </Box>
        <Box sx={{ gridArea: 'main' }} mx={{ xs: 3, sm: 8 }} mb={3} className={ styles.main }>
          { body }
        </Box>
        <Box sx={{ gridArea: 'footer' }} m={3} className={ styles.container }>
          { footer ? footer : null }
        </Box>
      </Box>
    </Box>
  );
}