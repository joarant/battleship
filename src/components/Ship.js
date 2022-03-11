import React from 'react';

function Ship({
  sprite, size, beingMoved, aax,
}) {
  // const a = 1;
  function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  return (

    <img
      id={aax}
      src="images/boksi.svg"
      alt=""
      width={120}
      height={100}
      style={{ position: 'absolute', alignContent: 'center' }}
      onDragStart={drag}
    />
  );
}
export default Ship;
