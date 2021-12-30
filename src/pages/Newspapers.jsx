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
import { clone } from "../utils";

export default function Newspapers() {
  const {
    newspapers,
    addNewspaper,
    deleteNewspaper,
    updateNewspaper,
    findNewspaperById,
  } = useContext(NewspaperContext);
  const [newspaper, setNewspaper] = useState(false);

  function handleSave() {
    if (newspaper.id) {
      const clonedNewspaper = clone(newspaper);

      updateNewspaper(clonedNewspaper);
    } else {
      const createdNewspaper = {
        ...newspaper,
        id: shortid.generate(),
        issues: [],
      };

      addNewspaper(createdNewspaper);
    }

    handleClose();
  }

  function handleDeleteNewspaper(e) {
    const currentId = e.currentTarget.id;
    deleteNewspaper(currentId);
  }

  function handleEditNewspaper(e) {
    const currentId = e.currentTarget.id;
    const newspaper = findNewspaperById(currentId);
    const clonedNewspaper = clone(newspaper);
    setNewspaper(clonedNewspaper);
  }

  function handleOpen() {
    setNewspaper({});
  }

  function handleClose() {
    setNewspaper(null);
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setNewspaper({ ...newspaper, [name]: value });
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
              handleEditNewspaper={handleEditNewspaper}
            />
          ))}
          <Grid item xs={12} sx={{ textAlign: "center", cursor: "pointer" }}>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>
              Добавить газету
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog fullWidth onClose={handleClose} open={!!newspaper}>
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
            name="name"
            value={(newspaper && newspaper.name) || ""}
            inputProps={{
              maxLength: 32,
            }}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Описание газеты"
            fullWidth
            variant="standard"
            name="description"
            value={(newspaper && newspaper.description) || ""}
            inputProps={{
              maxLength: 64,
            }}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Newspapers.route = "/newspapers";
