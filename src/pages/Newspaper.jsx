import AddIcon from "@mui/icons-material/Add";
import { FormControl, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import shortid from "shortid";
import IssueCard from "../components/IssueCard";
import NewspaperContext from "../context/NewspaperContext";
import { clone } from "../utils";

const defaultDate = format(new Date(), "yyyy-MM-dd");
const defaultColumns = 3;

export default function Newspaper() {
  const { findNewspaperById, addIssue, updateIssue, deleteIssue } =
    useContext(NewspaperContext);
  const { newspaperId, issueId } = useParams();
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
        Газета не найдена
      </Typography>
    );
  }

  if (issueId) {
    return <Outlet />;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: "1rem" }}>
          <Typography variant="p" gutterBottom component="div">
            Вcе номера газеты
          </Typography>
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
              Добавить номер
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog fullWidth onClose={handleClose} open={!!issue}>
        <DialogTitle>Добавление номера</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите название, дату и количество колонок в номере
          </DialogContentText>
          <TextField
            type="date"
            margin="dense"
            label="Дата номера"
            fullWidth
            variant="standard"
            name="date"
            value={(issue && issue.date) || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Название номера"
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
            <InputLabel>Количество колонок</InputLabel>
            <Select
              fullWidth
              variant="standard"
              name="columns"
              disabled={issue && issue.id}
              value={(issue && issue.columns) || ""}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value={1}>Одна колонка</MenuItem>
              <MenuItem value={2}>Две колонки</MenuItem>
              <MenuItem value={3}>Три колонки</MenuItem>
              <MenuItem value={4}>Четыре колонки</MenuItem>
              <MenuItem value={5}>Пять колонок</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Newspaper.route = "newspaper";
