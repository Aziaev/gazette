import AddIcon from "@mui/icons-material/Add";
import { FormControl, InputLabel, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";
import IssueCard from "../components/IssueCard";
import { useNewspaperContext } from "../context/NewspaperContext";
import { clone } from "../utils";
import Tasks from "./Tasks";

const defaultDate = format(new Date(), "yyyy-MM-dd");
const defaultColumns = 3;

export default function NewspaperIndex() {
  const { findNewspaperById, addIssue, updateIssue, deleteIssue } =
    useNewspaperContext();
  const { newspaperId } = useParams();
  const navigate = useNavigate();
  const newspaper = findNewspaperById(newspaperId);

  const [issue, setIssue] = useState(false);

  function handleSave() {
    if (issue.id) {
      const clonedIssue = clone(issue);
      updateIssue(clonedIssue);
    } else {
      const pages = [{ articles: [] }];
      addIssue({
        ...issue,
        id: shortid.generate(),
        pages,
        newspaperId,
      });
    }

    handleClose();
  }

  function getDeleteIssue(issue) {
    return () => {
      deleteIssue(issue);
    };
  }

  function getEditIssue(issue) {
    return () => {
      setIssue(issue);
    };
  }

  function handleOpen() {
    setIssue({
      date: defaultDate,
      columns: defaultColumns,
    });
  }

  function handleClose() {
    setIssue(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  }

  if (!newspaper) {
    return (
      <Typography variant="h2" gutterBottom component="div">
        ???????????? ???? ??????????????
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: "1rem" }}>
          <Stack direction="row">
            <Typography variant="p" gutterBottom component="div">
              ??c?? ???????????? ????????????
            </Typography>
            <Box sx={{ mr: 4, ml: 2 }}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  navigate(Tasks.route);
                }}
                variant="p"
              >
                ????????????
              </Link>
            </Box>
          </Stack>
          <Typography variant="h3" gutterBottom component="div">
            {newspaper.name}
          </Typography>
        </Box>
        <Grid container direction="row" spacing={2} alignItems="stretch">
          {newspaper.issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              handleDeleteIssue={getDeleteIssue(issue)}
              handleEditIssue={getEditIssue(issue)}
            />
          ))}
          <Grid item xs={12} sx={{ textAlign: "center", cursor: "pointer" }}>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>
              ???????????????? ????????????
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog fullWidth onClose={handleClose} open={!!issue}>
        <DialogTitle>???????????????????? ????????????</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ?????????????? ????????????????, ???????? ?? ???????????????????? ?????????????? ?? ????????????
          </DialogContentText>
          <TextField
            type="date"
            margin="dense"
            label="???????? ????????????"
            fullWidth
            variant="standard"
            name="date"
            value={(issue && issue.date) || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="???????????????? ????????????"
            fullWidth
            variant="standard"
            name="name"
            value={(issue && issue.name) || ""}
            inputProps={{
              maxLength: 32,
            }}
            onChange={handleChange}
          />
          <FormControl variant="standard" sx={{ mt: 1, width: "100%" }}>
            <InputLabel>???????????????????? ??????????????</InputLabel>
            <Select
              fullWidth
              variant="standard"
              name="columns"
              disabled={issue && issue.id}
              value={(issue && issue.columns) || ""}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value={1}>???????? ??????????????</MenuItem>
              <MenuItem value={2}>?????? ??????????????</MenuItem>
              <MenuItem value={3}>?????? ??????????????</MenuItem>
              <MenuItem value={4}>???????????? ??????????????</MenuItem>
              <MenuItem value={5}>???????? ??????????????</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>????????????????</Button>
          <Button onClick={handleSave}>??????????????????</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
