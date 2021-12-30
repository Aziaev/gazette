import { format, isValid } from "date-fns";
import shortId from "shortid";

export function formatDate(date) {
  if (!isValid) {
    return "-";
  }
  return format(new Date(date), "dd.MM.yyyy");
}

const defaultArticle = {
  headline: "",
  text: "",
};

export function getEmptyArticle() {
  return { ...defaultArticle, id: shortId.generate() };
}

export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function deleteArrayItemById(arr, itemId) {
  const itemIndex = arr.findIndex(({ id }) => itemId === id);

  arr.splice(itemIndex, 1);

  return arr;
}

export function findIndexInArray(arr, itemId) {
  return arr.findIndex(({ id }) => itemId === id);
}
