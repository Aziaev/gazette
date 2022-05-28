import { createContext, useContext } from "react";
import { clone, useLocalstorage } from "../utils";

/**
 * Контекст для работы со списком черновики.
 */
const DraftContext = createContext({
  drafts: [],

  addDraft(draft) {},
  deleteDraft(userId) {},
});

export const DraftsContextProvider = ({ children }) => {
  const [drafts, setDrafts] = useLocalstorage("drafts");

  function addDraft(draft) {
    setDrafts((prev) => [...prev, draft]);
  }

  function deleteDraft(draft) {
    setDrafts((prev) => {
      const drafts = clone(prev);
      const draftIndex = prev.findIndex(({ id }) => draft.id === id);
      drafts.splice(draftIndex, 1);

      return drafts;
    });
  }

  return (
    <DraftContext.Provider
      value={{
        drafts,
        addDraft,
        deleteDraft,
        setDrafts,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraftContext = () => {
  return useContext(DraftContext);
};
