import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function TaskEditDialog({ task, setTask, saveTask }) {
  function handleClose() {
    setTask(null);
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setTask({ ...task, [name]: value });
  }

  return (
    <Dialog fullWidth onClose={handleClose} open={!!task}>
      <DialogTitle>
        {task && task.id ? "Изменение задачи" : "Добавление задачи"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Заголовок задачи"
          fullWidth
          variant="standard"
          name="title"
          value={(task && task.title) || ""}
          inputProps={{
            maxLength: 32,
          }}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Описание задачи"
          fullWidth
          variant="standard"
          name="description"
          value={(task && task.description) || ""}
          inputProps={{
            maxLength: 128,
          }}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отменить</Button>
        <Button onClick={saveTask}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
}
