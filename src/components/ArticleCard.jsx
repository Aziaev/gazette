import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function ArticleCard(props) {
  const { article, size, editArticle, deleteArticle } = props;

  function handleDeleteArticle() {
    deleteArticle(article);
  }

  function handleEditArticle() {
    editArticle(article);
  }

  return (
    <Grid item xs={size}>
      <Card
        height="auto"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={!article.headline && { color: "lightgrey" }}
          >
            {article.headline || "Нет заголовка"}
          </Typography>
          <Typography
            variant="body2"
            sx={article.text ? { mt: 1.5 } : { mt: 1.5, color: "lightgrey" }}
          >
            {article.text || "Нет текста"}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleDeleteArticle} startIcon={<DeleteIcon />} />
          <Button onClick={handleEditArticle} startIcon={<EditIcon />} />
        </CardActions>
      </Card>
    </Grid>
  );
}
