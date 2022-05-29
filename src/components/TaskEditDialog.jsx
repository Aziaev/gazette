import { FormControl, InputLabel, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { TASK_TYPES } from "../constants";
import { useUserContext } from "../context/UserContext";
import { useUsersContext } from "../context/UsersContext";

export default function TaskEditDialog({ task, setTask, saveTask }) {
  const { user } = useUserContext();
  const { users, findUserById } = useUsersContext();

  function handleClose() {
    setTask(null);
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    setTask({ ...task, [name]: value });
  }

  function handleTaskTypeChange(e) {
    const { name, value } = e.target;

    setTask({ ...task, [name]: value });
  }

  function selectUserHandler(e) {
    const { name, value } = e.target;
    const user = findUserById(value);

    setTask({ ...task, [name]: user });
  }

  return (
    <Dialog fullWidth onClose={handleClose} open={!!task}>
      <DialogTitle>
        {task && task.id ? "Изменение задачи" : "Добавление задачи"}
      </DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 1, width: "100%" }} size="small">
          <InputLabel id="creator">Создатель задачи</InputLabel>
          <Select
            labelId="creator"
            name="creator"
            id="creator"
            value={task && task.creator ? task.creator.id : user.id}
            label="Создатель задачи"
            onChange={selectUserHandler}
            disabled
          >
            {users.map((user) => (
              <MenuItem value={user.id} key={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 4, width: "100%" }} size="small">
          <InputLabel id="assignee">Ответственный</InputLabel>
          <Select
            labelId="assignee"
            name="assignee"
            id="assignee"
            label="Создатель задачи"
            value={(task && task.assignee && task.assignee.id) || ""}
            onChange={selectUserHandler}
          >
            {users.map((user) => (
              <MenuItem value={user.id} key={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 4, width: "100%" }} size="small">
          <InputLabel id="assignee">Тип задачи</InputLabel>
          <Select
            labelId="type"
            name="type"
            id="type"
            label="Тип задачи"
            value={(task && task.type) || ""}
            onChange={handleTaskTypeChange}
          >
            {Object.keys(TASK_TYPES).map((key) => (
              <MenuItem value={key} key={key}>
                {TASK_TYPES[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
