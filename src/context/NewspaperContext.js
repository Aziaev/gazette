import { createContext } from "react";

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

export default NewspaperContext;
