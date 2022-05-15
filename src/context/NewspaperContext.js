import { createContext, useContext } from "react";
import { useLocalstorage } from "../utils";

/**
 * Контекст для работы со списком газет.
 */
const NewspaperContext = createContext({
  newspapers: [],

  addNewspaper(newspaper) {},
  findNewspaperById(newspaperId) {},
  updateNewspaper(newspaperId) {},
  deleteNewspaper(newspaperId) {},

  addIssue(issue) {},
  findIssueByIds(newspaperId, issueId) {},
  findIssueNumberByIds(newspaperId, issueId) {},
  updateIssue(issue) {},
  deleteIssue(issueId) {},
});

export const NewspaperContextProvider = ({ children }) => {
  const [newspapers, setNewspapers] = useLocalstorage("newspapers");

  // Поиск.
  function findNewspaperIndex(newspaperId) {
    return newspapers.findIndex(({ id }) => newspaperId === id);
  }

  function findNewspaperById(newspaperId) {
    return newspapers.find(({ id }) => newspaperId === id);
  }

  // CRUD газет
  function addNewspaper(newspaper) {
    setNewspapers([...newspapers, newspaper]);
  }

  function updateNewspaper(newspaper) {
    const tempNewspapers = [...newspapers];

    const newspaperIndex = findNewspaperIndex(newspaper.id);
    tempNewspapers.splice(newspaperIndex, 1, newspaper);

    setNewspapers(tempNewspapers);
  }

  function deleteNewspaper(newspaperId) {
    const tempNewspapers = [...newspapers];

    const newspaperIndex = findNewspaperIndex(newspaperId);
    tempNewspapers.splice(newspaperIndex, 1);

    setNewspapers(tempNewspapers);
  }

  // CRUD номеров
  function addIssue(issue) {
    const tempNewspapers = [...newspapers];

    const { newspaperId } = issue;

    const newspaperIndex = findNewspaperIndex(newspaperId);
    const newspaper = tempNewspapers[newspaperIndex];

    newspaper.issues = [...tempNewspapers[newspaperIndex].issues, issue];

    updateNewspaper(newspaper);
  }

  function updateIssue(issue) {
    const tempNewspapers = [...newspapers];

    const { newspaperId } = issue;

    const newspaperIndex = findNewspaperIndex(newspaperId);
    const issueIndex = newspapers[newspaperIndex].issues.findIndex(
      ({ id }) => issue.id === id
    );
    const newspaper = tempNewspapers[newspaperIndex];
    newspaper.issues[issueIndex] = issue;

    updateNewspaper(newspaper);
  }

  function deleteIssue(issue) {
    const tempNewspapers = [...newspapers];
    const { newspaperId } = issue;
    const newspaperIndex = findNewspaperIndex(newspaperId);
    const issueIndex = newspapers[newspaperIndex].issues.findIndex(
      ({ id }) => issue.id === id
    );
    const newspaper = tempNewspapers[newspaperIndex];
    const tempIssues = newspaper.issues;
    tempIssues.splice(issueIndex, 1);
    newspaper.issues = tempIssues;

    setNewspapers(tempNewspapers);
  }

  function findIssueByIds(newspaperId, issueId) {
    const newspaper = findNewspaperById(newspaperId);

    return newspaper && newspaper.issues.find(({ id }) => issueId === id);
  }

  function findIssueNumberByIds(newspaperId, issueId) {
    const newspaper = findNewspaperById(newspaperId);

    const number =
      newspaper && newspaper.issues.findIndex(({ id }) => issueId === id);

    return number + 1;
  }

  return (
    <NewspaperContext.Provider
      value={{
        newspapers,

        addNewspaper,
        updateNewspaper,
        deleteNewspaper,
        findNewspaperById,

        addIssue,
        updateIssue,
        deleteIssue,
        findIssueByIds,
        findIssueNumberByIds,
      }}
    >
      {children}
    </NewspaperContext.Provider>
  );
};

export const useNewspaperContext = () => {
  return useContext(NewspaperContext);
};
