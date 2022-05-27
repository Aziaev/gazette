import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useNewspaperContext } from "../context/NewspaperContext";
import { formatDate } from "../utils";

export default function Footer() {
  const { newspaperId, issueId } = useParams();
  const { findIssueByIds, findIssueNumberByIds } = useNewspaperContext();
  const issue = findIssueByIds(newspaperId, issueId);
  const issueNumber = findIssueNumberByIds(newspaperId, issueId);

  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: "1rem",
        borderTop: "1px lightgrey dashed",
      }}
    >
      <Typography variant="caption" display="block" gutterBottom>
        {issue
          ? `Выпуск №${issueNumber} от ${formatDate(issue.date)}`
          : "Редакция"}
      </Typography>
    </Box>
  );
}
