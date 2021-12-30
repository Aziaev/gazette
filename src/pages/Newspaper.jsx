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

const defaultDate = format(new Date(), "yyyy-MM-dd");
const defaultColumns = 3;

export default function Newspaper() {
  const { findNewspaperById, addIssue, deleteIssue } =
    useContext(NewspaperContext);
  const { newspaperId, issueId } = useParams();
  const newspaper = findNewspaperById(newspaperId);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [date, setDate] = useState(defaultDate);
  const [columns, setColumns] = useState(defaultColumns);

  function handleAddIssue() {
    const articles = [];
    addIssue({
      id: shortid.generate(),
      name,
      date,
      articles,
      columns,
      newspaperId,
    });

    handleClose();
  }

  function getDeleteIssue(issue) {
    return () => {
      deleteIssue(issue);
    };
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setName(null);
    setDate(defaultDate);
    setColumns(defaultColumns);
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
            Вcе выпуски газеты
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
            />
          ))}
          <Grid item xs={12} sx={{ textAlign: "center", cursor: "pointer" }}>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>
              Добавить выпуск
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Добавление выпуска</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите название, дату и количество колонок в выпуске
          </DialogContentText>
          <TextField
            type="date"
            margin="dense"
            label="Дата выпуска"
            fullWidth
            variant="standard"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Название выпуска"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl variant="standard" sx={{ mt: 1, width: "100%" }}>
            <InputLabel>Количество колонок</InputLabel>
            <Select
              fullWidth
              variant="standard"
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
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
          <Button onClick={handleAddIssue}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Newspaper.route = "newspaper";
