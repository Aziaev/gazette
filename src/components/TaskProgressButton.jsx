import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useRef, useState } from "react";
import shortId from "shortid";
import { TASK_STATUSES, TASK_TYPES } from "../constants";
import { useDraftContext } from "../context/DraftContext";
import { useTasksContext } from "../context/TasksContext";
import ArticleEditor from "./ArticleEditor";

export default function TaskProgressButton({ task }) {
  const { type, status } = task;
  const { addDraft, setDrafts } = useDraftContext();
  const { updateTask } = useTasksContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const fileInput = useRef();

  function uploadFile(e) {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        addDraft({
          base64: reader.result,
          id: shortId.generate(),
          task,
        });
        updateTaskStatus();
      };

      reader.readAsDataURL(file);
    }
  }

  function updateTaskStatus() {
    updateTask({ ...task, status: TASK_STATUSES.inProgress });
  }

  function openEditor() {
    setIsEditorOpen(() => true);
  }

  function closeEditor() {
    setIsEditorOpen(false);
  }

  const buttonText =
    status === TASK_STATUSES.new
      ? "Начать выполнение"
      : "Продолжить выполнение";

  if (task.status !== TASK_STATUSES.new) {
    return null;
  }

  function setArticles(articles) {
    updateTaskStatus();
    setDrafts(articles);
  }

  return (
    <>
      {TASK_TYPES[type] === TASK_TYPES.addText ? (
        <ListItemButton onClick={openEditor}>
          <PlayArrowIcon /> <ListItemText>{buttonText}</ListItemText>
        </ListItemButton>
      ) : (
        <label htmlFor="image">
          <Input
            accept="image/*"
            id="image"
            type="file"
            name="image"
            ref={fileInput}
            onChange={uploadFile}
          />
          <ListItemButton>
            <PlayArrowIcon /> <ListItemText>{buttonText}</ListItemText>
          </ListItemButton>
        </label>
      )}
      <ArticleEditor
        isEditorOpen={isEditorOpen}
        setArticles={setArticles}
        closeEditor={closeEditor}
        task={task}
      />
    </>
  );
}

const Input = styled("input")({
  display: "none",
});
