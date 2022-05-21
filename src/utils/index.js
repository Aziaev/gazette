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

export const useLocalstorage = (key) => {
  const [value, setValue] = useState(getParsedLocalstorageData(key));

  useEffect(() => {
    setLocalstorageData(key, value);
  }, [key, value]);

  return [value, setValue];
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

export function useArticleDrop({ article: { id, index }, issue, activePage }) {
  const ref = useRef(null);
  const { findIssueByIds, updateIssue } = useNewspaperContext();

  const moveArticle = useCallback(
    (dragIndex, hoverIndex) => {
      const clonedIssue = clone(issue);
      const currentPageArticles = clonedIssue.pages[activePage].articles;
      const draggedArtice = currentPageArticles[dragIndex];
      currentPageArticles.splice(dragIndex, 1);
      currentPageArticles.splice(hoverIndex, 0, draggedArtice);
      updateIssue(clonedIssue);
    },
    [activePage, issue, updateIssue]
  );

  const [{ handlerId, isOver }, drop] = useDrop({
    accept: "article",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    hover(item, monitor) {
      console.log("hover");

      //
      // if (!ref.current) {
      //   return;
      // }
      // const dragIndex = item.index;
      // const hoverIndex = index;
      // if (dragIndex === hoverIndex) {
      //   return;
      // }
      // const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // const hoverMiddleY =
      //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // const clientOffset = monitor.getClientOffset();
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }
      //
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }
      // moveArticle(dragIndex, hoverIndex);
      // item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "article",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return {
    opacity,
    handlerId,
    isOver,
  };
}
