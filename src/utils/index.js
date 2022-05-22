import { format, isValid } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNewspaperContext } from "../context/NewspaperContext";

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

export const useLocalstorage = (key, defaultValue = []) => {
  const [value, setValue] = useState(getParsedLocalstorageData(key));

  useEffect(() => {
    setLocalstorageData(key, value);
  }, [key, value]);

  return [value || defaultValue, setValue];
};

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  const strArr = name.split(" ");
  const firstLetter = strArr[0][0];
  const secondLetter = strArr[1] ? strArr[1][0] : "";

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstLetter}${secondLetter}`,
  };
}
