import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import draftToHtml from "draftjs-to-html";
import "../assets/css/articleCard.css";

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
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
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
          <Box
            sx={article.text ? { mt: 1.5 } : { mt: 1.5, color: "lightgrey" }}
          >
            {article.text ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(article.text),
                }}
              />
            ) : (
              "Нет текста"
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleDeleteArticle} startIcon={<DeleteIcon />} />
          <Button onClick={handleEditArticle} startIcon={<EditIcon />} />
        </CardActions>
      </Card>
    </Grid>
  );
}
