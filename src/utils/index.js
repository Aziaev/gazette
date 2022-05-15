import { format, isValid } from "date-fns";
import { useState } from "react";

export function formatDate(date) {
  if (!isValid) {
    return "-";
  }
  return format(new Date(date), "dd.MM.yyyy");
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

const getParsedLocalstorageData = (key) => {
  let value = [];

  try {
    value = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.info("cannot parse localStorage, return empty object");
  }

  return value;
};

const setLocalstorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const useLocalstorage = (key) => {
  const [value, setValue] = useState(getParsedLocalstorageData(key) || []);

  const saveDataToLocalStorage = (data) => {
    setLocalstorageData(key, data);

    setValue(data);
  };

  return [value, saveDataToLocalStorage];
};
