import Button from "@mui/material/Button";
import { color } from "../theme";
import { makeStyles } from "@mui/styles";

export function paginate(array: Array<any>, pageSize: number, pageNumber: number): Array<any> {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export default function Pagination({ onPreviousClick, onNextClick }: any): JSX.Element {
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
      <Button className={paginationButton} color="secondary" sx={{ mx: 1 }} 
        onClick={onPreviousClick}
        disabled={onPreviousClick ? false : true }
      >
        Previous page
      </Button>
      <Button className={paginationButton} color="secondary" sx={{ mx: 1 }} 
        onClick={onNextClick}
        disabled={onNextClick ? false : true }
      >
        Next page
      </Button>
    </>
  )
}