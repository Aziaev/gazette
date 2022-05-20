import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ListItemIcon, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { convertToRaw, EditorState } from "draft-js";
import { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useParams } from "react-router-dom";
import shortId from "shortid";
import Articles from "../components/Articles";
import PageSwitch from "../components/PageSwitch";
import { useNewspaperContext } from "../context/NewspaperContext";
import { clone, findIndexInArray, formatDate } from "../utils";

const defaultArticle = {
  headline: "",
  text: "",
};

const Input = styled("input")({
  display: "none",
});

export default function Issue() {
  const { newspaperId, issueId } = useParams();
  const { findIssueByIds, updateIssue } = useNewspaperContext();
  const [editedArticle, setEditedArticle] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const issue = findIssueByIds(newspaperId, issueId);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInput = useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  function handleClose() {
    setEditedArticle(null);
  }

  function addArticle() {
    setEditedArticle(defaultArticle);
    setEditorState(EditorState.createEmpty());
    closeMenu();
  }

  function uploadFile(e) {
    const clonedIssue = clone(issue);

    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        clonedIssue.pages[activePage].articles = [
          ...clonedIssue.pages[activePage].articles,
          {
            base64: reader.result,
            id: shortId.generate(),
          },
        ];

        updateIssue(clonedIssue);

        closeMenu();
      };

      reader.readAsDataURL(file);
    }
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    setEditedArticle({ ...editedArticle, [name]: value });
  }

  function handleSave() {
    const clonedIssue = clone(issue);

    if (editedArticle.id) {
      const articleIndex = findIndexInArray(
        clonedIssue.pages[activePage].articles,
        editedArticle.id
      );

      clonedIssue.pages[activePage].articles[articleIndex] = {
        ...editedArticle,
        text: convertToRaw(editorState.getCurrentContent()),
      };
    } else {
      clonedIssue.pages[activePage].articles = [
        ...clonedIssue.pages[activePage].articles,
        {
          ...editedArticle,
          id: shortId.generate(),
          text: convertToRaw(editorState.getCurrentContent()),
        },
      ];
    }

    updateIssue(clonedIssue);
    setEditedArticle(null);
    setEditorState(() => EditorState.createEmpty());
  }

  if (!issue) {
    return (
      <Typography variant="h2" gutterBottom component="div">
        Номер не найден
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mb: "1rem" }}>
          <Typography variant="p" gutterBottom component="div">
            Номер от {formatDate(issue.date)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom component="div">
              {issue.name}
            </Typography>
            <Button
              id="basic-button"
              aria-controls={open ? "issue-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={addArticle}>
                <ListItemIcon>
                  <ArticleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Добавить статью</ListItemText>
              </MenuItem>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  name="image"
                  ref={fileInput}
                  onChange={uploadFile}
                />
                <MenuItem>
                  <ListItemIcon>
                    <AddPhotoAlternateOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Добавить картинку</ListItemText>
                </MenuItem>
              </label>
            </Menu>
          </Box>
        </Box>
        <Articles
          setEditedArticle={setEditedArticle}
          setEditorState={setEditorState}
          activePage={activePage}
        />
        <PageSwitch activePage={activePage} setActivePage={setActivePage} />
      </Box>
      <EditIssueDialog
        editedArticle={editedArticle}
        editorState={editorState}
        setEditorState={setEditorState}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </>
  );
}

Issue.route = "issue";

function EditIssueDialog({
  editedArticle,
  editorState,
  setEditorState,
  handleClose,
  handleChange,
  handleSave,
}) {
  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      onClose={handleClose}
      open={!!editedArticle}
    >
      <DialogTitle>Редактирование статьи</DialogTitle>
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
