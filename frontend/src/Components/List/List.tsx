// List.tsx
import React, { useState } from "react";
import { Button } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import "../../Style/ListStyle/ListStyle.css";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setStartIndex((prevIndex) => (prevIndex - 4 >= 0 ? prevIndex - 4 : 0));
    } else {
      setStartIndex((prevIndex) =>
        prevIndex + 4 < items.length ? prevIndex + 4 : prevIndex
      );
    }
  };

  return (
    <div className="list">
      <div className="items-container" >
        {items.slice(startIndex, startIndex + 4).map((item, index) => (
          <div key={index} className="item-wrapper">
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div className="button-container">
        <Button
          className="scroll-button prev-button"
          onClick={() => handleScroll("prev")}
          disabled={startIndex === 0}
          data-testid="prev-button"
        >
          <NavigateBefore className="nav-icon" />
        </Button>
        <Button
          className="scroll-button next-button"
          onClick={() => handleScroll("next")}
          disabled={startIndex + 4 >= items.length}
          data-testid="next-button"
        >
          <NavigateNext className="nav-icon" />
        </Button>
      </div>
    </div>
  );
}

export default List;
