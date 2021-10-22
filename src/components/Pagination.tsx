import Button from "@mui/material/Button";
import { color } from "../theme";
import { makeStyles } from "@mui/styles";

export default function Pagination({ previous, next }: any): JSX.Element {
  const { paginationButton } = makeStyles(() => ({
    paginationButton: {
      fontSize: "24px",
      backgroundColor:`${color.racing_green}`,
      borderRadius:"20px",
      textAlign: "center",
    }
  }))();

  return (
    <>
      <Button className={paginationButton} color="secondary" sx={{ mx: 1 }}>Previous page</Button>
      <Button className={paginationButton} color="secondary" sx={{ mx: 1 }}>Next page</Button>
    </>
  )
}