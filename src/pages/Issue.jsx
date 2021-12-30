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
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import NewspaperContext from "../context/NewspaperContext";
import {
  clone,
  deleteArrayItemById,
  findIndexInArray,
  formatDate,
  getEmptyArticle,
} from "../utils";

const columnsConfig = {
  0: {},
  1: {
    colSize: 12,
  },
  2: {
    colSize: 6,
  },
  3: {
    colSize: 4,
  },
  4: {
    colSize: 3,
  },
  5: {
    gridSize: 15,
    colSize: 3,
  },
};

export default function Issue() {
  const { newspaperId, issueId } = useParams();
  const { findIssueByIds, updateIssue } = useContext(NewspaperContext);
  const issue = findIssueByIds(newspaperId, issueId);
  const { articles, columns } = issue;

  const displayAddButton = articles.length < columns;

  const [editedArticle, setEditedArticle] = useState(null);

  function handleClose() {
    setEditedArticle(null);
  }

  function addArticle() {
    const clonedIssue = clone(issue);
    const { articles } = clonedIssue;

    if (displayAddButton) {
      clonedIssue.articles = [...articles, getEmptyArticle()];
      updateIssue(clonedIssue);
    }
  }

  function deleteArticle(article) {
    const clonedIssue = clone(issue);

    deleteArrayItemById(clonedIssue.articles, article.id);

    updateIssue(clonedIssue);
  }

  function editArticle(article) {
    const clonedArticle = clone(article);

    setEditedArticle(clonedArticle);
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    setEditedArticle({ ...editedArticle, [name]: value });
  }

  function handleSave() {
    const clonedIssue = clone(issue);

    const articleIndex = findIndexInArray(
      clonedIssue.articles,
      editedArticle.id
    );

    clonedIssue.articles[articleIndex] = editedArticle;

    updateIssue(clonedIssue);
    setEditedArticle(null);
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
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
          columns={columnsConfig[articles.length].gridSize}
        >
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              size={columnsConfig[articles.length].colSize}
              article={article}
              deleteArticle={deleteArticle}
              editArticle={editArticle}
            />
          ))}
          {displayAddButton && (
            <Grid item xs={12} sx={{ textAlign: "center", cursor: "pointer" }}>
              <Button onClick={addArticle} startIcon={<AddIcon />}>
                Добавить колонку
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
      <Dialog fullWidth onClose={handleClose} open={!!editedArticle}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Issue.route = "issue";
