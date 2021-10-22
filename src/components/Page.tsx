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
      justifyContent: "center",
      alignItems: "center"
    },
    footerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      width: "100%"
    }
  }))();

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: 
            `"header header . sidebar"
            "main main main main"
            "footer footer footer footer"`,
        }}
      >
        <Box sx={{ gridArea: 'header' }}>
          <Header />
        </Box>
        <Box sx={{ gridArea: 'sidebar' }} className={ sidebarContainer }>
          { sidebar ? sidebar : null }
        </Box>
        <Box sx={{ gridArea: 'main' }} className={ bodyContainer }>
          { body }
        </Box>
        <Box sx={{ gridArea: 'footer' }} className={ footerContainer } m={2}>
          { footer ? footer : null }
        </Box>
      </Box>
    </Box>
  );
}