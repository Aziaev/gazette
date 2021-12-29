import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import shortid from "shortid";
import Newspaper from "../components/Newspaper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Newspapers() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [newspapers, setNewspapers] = useState([]);

  function handleAddNewspaper() {
    setNewspapers([...newspapers, { id: shortid.generate(), name }]);

    handleClose();
  }

  function handleDeleteNewspaper(e) {
    const tempNewspapers = [...newspapers];

    const currentId = e.currentTarget.id;
    const deletedNewspaperIndex = newspapers.findIndex(
      ({ id }) => id === currentId
    );
    tempNewspapers.splice(deletedNewspaperIndex, 1);

    setNewspapers(tempNewspapers);
  }

  function handleClose() {
    setOpen(false);
    setName(null);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          {newspapers.map((newspaper) => (
            <Newspaper
              key={newspaper.id}
              {...newspaper}
              handleDeleteNewspaper={handleDeleteNewspaper}
            />
          ))}
          <Grid item xs={4}>
            <Item sx={{ cursor: "pointer" }} onClick={setOpen}>
              <IconButton>
                <AddIcon />
                Добавить газету
              </IconButton>
            </Item>
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
            onChange={(e) => setName(e.target.value)}
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
