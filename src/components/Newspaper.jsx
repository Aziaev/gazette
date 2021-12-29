import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function Newspaper(props) {
  const { id, name, handleDeleteNewspaper } = props;
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton id={id} onClick={handleDeleteNewspaper}>
            <DeleteIcon />
          </IconButton>
          <Button size="small">Посмотреть</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
