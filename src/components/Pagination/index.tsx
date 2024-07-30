import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";

interface PaginationProps {
  page: number;
  handleNext: () => void;
  handleBack: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, handleNext, handleBack }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <IconButton aria-label="go back" onClick={handleBack} disabled={page === 1}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      <span>Page {page}</span>
      <IconButton aria-label="go forward" onClick={handleNext}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Pagination;
