import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props
  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots <= 0, 
  });

  const formatSpots= (spots) => {

    return spots > 1 ? `${spots} spots` 
        : spots === 1 ? "1 spot"
        : "no spots"
  };

  return (
    <li className={dayListClass} data-testid="day" onClick={() => {setDay(name)}}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}

