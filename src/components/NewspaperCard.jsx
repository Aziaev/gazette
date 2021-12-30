import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Newspaper from "../pages/Newspaper";

export default function NewspaperCard(props) {
  const { id, name, description, handleDeleteNewspaper, handleEditNewspaper } =
    props;
  const navigate = useNavigate();

  function handleOpenNewspaper(e) {
    const id = e.currentTarget.id;
    navigate(`/${Newspaper.route}/${id}`);
  }

  return (
    <Grid item xs={4}>
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            газета
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            id={id}
            onClick={handleDeleteNewspaper}
            startIcon={<DeleteIcon />}
          />
          <Button
            id={id}
            onClick={handleEditNewspaper}
            startIcon={<EditIcon />}
          />
          <Button size="small" id={id} onClick={handleOpenNewspaper}>
            Посмотреть
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
