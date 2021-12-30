import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import shortid from "shortid";
import NewspaperCard from "../components/NewspaperCard";
import NewspaperContext from "../context/NewspaperContext";

export default function Newspapers() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const { newspapers, addNewspaper, deleteNewspaper } =
    useContext(NewspaperContext);

  function handleAddNewspaper() {
    const newspaper = { id: shortid.generate(), name, description, issues: [] };

    addNewspaper(newspaper);

    handleClose();
  }

  function handleDeleteNewspaper(e) {
    const currentId = e.currentTarget.id;
    deleteNewspaper(currentId);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setName(null);
    setDescription(null);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="row" spacing={2} alignItems="stretch">
          {newspapers.map((newspaper) => (
            <NewspaperCard
              key={newspaper.id}
              {...newspaper}
              handleDeleteNewspaper={handleDeleteNewspaper}
            />
          ))}
          <Grid item xs={12} sx={{ textAlign: "center", cursor: "pointer" }}>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>
              Добавить газету
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Добавление газеты</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите название для новой газеты
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Название газеты"
            fullWidth
            variant="standard"
            value={name}
            maxlength={3}
            inputProps={{
              maxLength: 32,
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Описание газеты"
            fullWidth
            variant="standard"
            value={description}
            maxlength={3}
            inputProps={{
              maxLength: 64,
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleAddNewspaper}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Newspapers.route = "/newspapers";
