import { convertToRaw, EditorState } from "draft-js";
import * as React from "react";
import { useEffect, useState } from "react";
import shortId from "shortid";
import { EditArticleDialog } from "./EditArticleDialog";

const defaultArticle = {
  headline: "",
  text: "",
};

export default function ArticleEditor({
  isEditorOpen,
  closeEditor,
  setArticles,
  task,
}) {
  const [editedArticle, setEditedArticle] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function saveArticle() {
    const newArticle = {
      ...editedArticle,
      id: shortId.generate(),
      text: convertToRaw(editorState.getCurrentContent()),
      task,
    };

    setArticles((prev) => [...prev, newArticle]);
    closeArticleEditor();
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    setEditedArticle({ ...editedArticle, [name]: value });
  }

  function closeArticleEditor() {
    setEditedArticle(null);
    setEditorState(() => EditorState.createEmpty());
    closeEditor();
  }

  function addArticle() {
    setEditedArticle(defaultArticle);
    setEditorState(() => EditorState.createEmpty());
  }

  useEffect(() => {
    if (isEditorOpen) {
      addArticle();
    }
  }, [isEditorOpen]);

  return (
    <EditArticleDialog
      editedArticle={editedArticle}
      editorState={editorState}
      setEditorState={setEditorState}
      handleClose={closeArticleEditor}
      handleChange={handleChange}
      handleSave={saveArticle}
      title="Добавление статьи"
    />
  );
}
