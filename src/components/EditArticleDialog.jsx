import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";

export function EditArticleDialog({
  editedArticle,
  editorState,
  setEditorState,
  handleClose,
  handleChange,
  handleSave,
  title = "Редактирование статьи",
}) {
  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      onClose={handleClose}
      open={!!editedArticle}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Заголовок статьи"
          fullWidth
          variant="standard"
          name="headline"
          inputProps={{
            maxLength: 32,
          }}
          value={(editedArticle && editedArticle.headline) || ""}
          onChange={handleChange}
        />
        <Box
          sx={{
            mt: "2rem",
            border: "1px lightgrey dashed",
          }}
        >
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "remove",
                "history",
              ],
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отменить</Button>
        <Button onClick={handleSave}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
}
