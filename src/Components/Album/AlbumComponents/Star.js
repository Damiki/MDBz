import React from 'React';

const Star = (props) => {
  return (
    <svg
      onClick={props.isClicked(props.id)}
      height="110" width="250">

      <polygon
        className={props.clicked ? "star-color" : ""}
        points="100,10 40,198 190,78 10,78 160,198"
        style="fill:white;stroke-width:5;fill-rule:nonzero;" />
    </svg>
  );
}

export default Star;