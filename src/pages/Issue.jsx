import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useContext, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import NewspaperContext from "../context/NewspaperContext";
import {
  clone,
  deleteArrayItemById,
  findIndexInArray,
  formatDate,
  getEmptyArticle,
  getGridConfig,
} from "../utils";

export default function Issue() {
  const { newspaperId, issueId } = useParams();
  const { findIssueByIds, updateIssue } = useContext(NewspaperContext);
  const [editedArticle, setEditedArticle] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const issue = findIssueByIds(newspaperId, issueId);
  const { pages, columns } = issue;

  function handleClose() {
    setEditedArticle(null);
  }

  function addArticle() {
    const clonedIssue = clone(issue);

    clonedIssue.pages[activePage].articles = [
      ...clonedIssue.pages[activePage].articles,
      getEmptyArticle(),
    ];
    updateIssue(clonedIssue);
  }

  function deleteArticle(article) {
    const clonedIssue = clone(issue);

    deleteArrayItemById(clonedIssue.pages[activePage].articles, article.id);

    updateIssue(clonedIssue);
  }

  function editArticle(article) {
    const clonedArticle = clone(article);
    if (clonedArticle.text) {
      const contentState = convertFromRaw(clonedArticle.text);
      const editorState = EditorState.createWithContent(contentState);

      setEditorState(editorState);
    }
    setEditedArticle(clonedArticle);
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    setEditedArticle({ ...editedArticle, [name]: value });
  }

  function handleSave() {
    const clonedIssue = clone(issue);

    const articleIndex = findIndexInArray(
      clonedIssue.pages[activePage].articles,
      editedArticle.id
    );

    clonedIssue.pages[activePage].articles[articleIndex] = {
      ...editedArticle,
      text: convertToRaw(editorState.getCurrentContent()),
    };

    updateIssue(clonedIssue);
    setEditedArticle(null);
    setEditorState(() => EditorState.createEmpty());
  }

  function togglePage(e) {
    const page = e.target.id;
    setActivePage(page);
  }

  function addPageButtonHandler() {
    const clonedIssue = clone(issue);
    const { pages } = clonedIssue;

    clonedIssue.pages = [...pages, { articles: [] }];
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
          <Typography variant="h3" gutterBottom component="div">
            {issue.name}
          </Typography>
        </Box>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="stretch"
          sx={{ flexGrow: 1 }}
          columns={
            getGridConfig(pages[activePage].articles.length, columns).gridSize
          }
        >
          {pages[activePage].articles.map((article, index) => (
            <ArticleCard
              key={index}
              size={
                getGridConfig(pages[activePage].articles.length, columns)
                  .colSize
              }
              article={article}
              deleteArticle={deleteArticle}
              editArticle={editArticle}
            />
          ))}
          <Grid item xs={12} sx={{ textAlign: "center", cursor: "pointer" }}>
            <Button onClick={addArticle} startIcon={<AddIcon />}>
              Добавить статью
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: "1rem" }}>
          {pages.map((page, index) => (
            <Button
              key={index}
              id={index}
              variant={
                String(activePage) === String(index) ? "outlined" : undefined
              }
              size="small"
              sx={{ mr: 1 }}
              onClick={togglePage}
            >
              Страница {index + 1}
            </Button>
          ))}
          {pages.length < 10 && (
            <Button size="small" onClick={addPageButtonHandler}>
              + Добавить страницу
            </Button>
          )}
        </Box>
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
