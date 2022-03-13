import React, { useEffect } from 'react';

function Ship({
  sprite, size, beingMoved, imgId, parentCellPosition,
}) {
  // const a = 1;
  const drag = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
  };

  useEffect(() => {
    const myPics = document.getElementById(imgId);
    window.addEventListener('keyup', (e) => {
      console.log('moi');
      if (myPics.style.transform === 'rotate(270deg)') {
        myPics.style.transform = 'rotate(360deg)';
      } else {
        myPics.style.transform = 'rotate(270deg)';
      }
      console.log(myPics.getBoundingClientRect());
    });
  }, []);

  return (

    <img
      id={imgId}
      src="images/arrow.svg"
      alt=""
      width={120}
      height={100}
      style={{ position: 'absolute' }}
      onDragStart={drag}
    />
  );
}
export default Ship;
