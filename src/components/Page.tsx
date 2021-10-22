import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { ReactNode } from "react";
import Header from "./Header";

interface Props {
  children: {
    sidebar?: ReactNode
    body: ReactNode
    footer?: ReactNode  }
}

export default function Page(props: Props) {
  const { sidebar, body, footer } = props.children;

  const { sidebarContainer, bodyContainer, footerContainer } = makeStyles(() => ({
    sidebarContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    bodyContainer: {
      display: "flex",
      flexDirection: "column"
    },
    footerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
        <Box sx={{ gridArea: 'sidebar' }} mx={{ xs: 3, sm: 8 }} my={{ xs: 0, sm: 3 }} className={ sidebarContainer }>
          { sidebar ? sidebar : null }
        </Box>
        <Box sx={{ gridArea: 'main' }} mx={{ xs: 3, sm: 8 }} mb={3} className={ bodyContainer }>
          { body }
        </Box>
        <Box sx={{ gridArea: 'footer' }} m={3} className={ footerContainer }>
          { footer ? footer : null }
        </Box>
      </Box>
    </Box>
  );
}