import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { convertToRaw, EditorState } from "draft-js";
import * as React from "react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import shortId from "shortid";
import Articles from "../components/Articles";
import { EditArticleDialog } from "../components/EditArticleDialog";
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
  const [issueEditorOpen, setIssueEditorOpen] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const issue = findIssueByIds(newspaperId, issueId);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInput = useRef();

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openIssueEditor = () => {
    setIssueEditorOpen(true);
  };

  const closeIssueEditor = () => {
    setIssueEditorOpen(false);
  };

  const saveIssue = (issue) => {
    console.log({ issue });
    updateIssue(issue);
    closeIssueEditor();
    closeMenu();
  };

  function closeArticleEditor() {
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
        const index = clonedIssue.pages[activePage].articles.length;

        clonedIssue.pages[activePage].articles = [
          ...clonedIssue.pages[activePage].articles,
          {
            base64: reader.result,
            index,
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

  function saveArticle() {
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

  function saveArticleImage(articleImage) {
    const clonedIssue = clone(issue);

    const articleIndex = findIndexInArray(
      clonedIssue.pages[activePage].articles,
      articleImage.id
    );

    clonedIssue.pages[activePage].articles[articleIndex] = articleImage;
    updateIssue(clonedIssue);
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
              onClick={openMenu}
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
              <MenuItem onClick={openIssueEditor}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Настройки выпуска</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Articles
          setEditedArticle={setEditedArticle}
          setEditorState={setEditorState}
          activePage={activePage}
          saveArticleImage={saveArticleImage}
        />
        <PageSwitch activePage={activePage} setActivePage={setActivePage} />
      </Box>
      <EditArticleDialog
        editedArticle={editedArticle}
        editorState={editorState}
        setEditorState={setEditorState}
        handleClose={closeArticleEditor}
        handleChange={handleChange}
        handleSave={saveArticle}
      />
      {issueEditorOpen && (
        <EditIssueDialog
          issue={issue}
          saveIssue={saveIssue}
          issueEditorOpen={issueEditorOpen}
          closeIssueEditor={closeIssueEditor}
        />
      )}
    </>
  );
}

Issue.route = "issue";

const HEADER_TEXT_VARIANTS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "caption",
  "overline",
];

const TEXT_SIZES = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "28px",
  "32px",
];

function EditIssueDialog({
  issue: defaultIssue,
  closeIssueEditor,
  issueEditorOpen,
  saveIssue,
}) {
  const [issue, setIssue] = useState(defaultIssue);
  console.log({ defaultIssue, issue });

  function handleChange(e) {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  }

  return (
    <Dialog fullWidth onClose={closeIssueEditor} open={issueEditorOpen}>
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
            value={(issue && issue.columns) || ""}
            onChange={handleChange}
          >
            <MenuItem value={1}>Одна колонка</MenuItem>
            <MenuItem value={2}>Две колонки</MenuItem>
            <MenuItem value={3}>Три колонки</MenuItem>
            <MenuItem value={4}>Четыре колонки</MenuItem>
            <MenuItem value={5}>Пять колонок</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ mt: 1, width: "100%" }}>
          <InputLabel>Шрифт заголовка</InputLabel>
          <Select
            fullWidth
            variant="standard"
            name="headerSize"
            value={(issue && issue.headerSize) || ""}
            onChange={handleChange}
          >
            {HEADER_TEXT_VARIANTS.map((tp) => (
              <MenuItem key={tp} value={tp}>
                {tp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ mt: 1, width: "100%" }}>
          <InputLabel>Шрифт текста</InputLabel>
          <Select
            fullWidth
            variant="standard"
            name="textSize"
            value={(issue && issue.textSize) || ""}
            onChange={handleChange}
          >
            {TEXT_SIZES.map((ts) => (
              <MenuItem key={ts} value={ts}>
                {ts}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeIssueEditor}>Отменить</Button>
        <Button onClick={() => saveIssue(issue)}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
}
