import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useRef } from "react";
import shortId from "shortid";

const Input = styled("input")({
  display: "none",
});

export default function FileUploader({ saveImage }) {
  const fileInput = useRef();

  function uploadFile(e) {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        saveImage({
          base64: reader.result,
          id: shortId.generate(),
        });
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <ListItem disablePadding>
      <label htmlFor="fileUpload">
        <Input
          accept="image/*"
          id="fileUpload"
          type="file"
          name="image"
          ref={fileInput}
          onChange={uploadFile}
        />
        <ListItemButton>
          <ListItemIcon>
            <AddPhotoAlternateOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Добавить картинку</ListItemText>
        </ListItemButton>
      </label>
    </ListItem>
  );
}
