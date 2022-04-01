import React, { useEffect, useState } from 'react';

function Ship({
  sprite, size, setShip, imgId,
}) {
  const [mouseTransparent, setMouseTransparent] = useState(false);
  const [horizontalOrientation, setHorizontalOrientation] = useState(true);
  const [initMousePosWithinObject, setInitMousePosWithinObject] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);

  let ship = null;

  const rotateShip = (es) => {
    if (es.key === 'r' || es.key === 'R') {
      if (!horizontalOrientation) {
        setHorizontalOrientation(true);
      } else {
        setHorizontalOrientation(false);
      }
    }
  };

  const closeDragElement = () => {
    /* stop moving when mouse button is released: */
    window.removeEventListener('keyup', rotateShip);
    document.onmouseup = null;
    document.onmousemove = null;
    setMouseTransparent(false);
    const grabCell = (horizontalOrientation
      ? Math.floor(initMousePosWithinObject.x / 80)
      : Math.floor(initMousePosWithinObject.y / 80));
    setShip(imgId, initialPosition, grabCell, horizontalOrientation);
  };

  function dragElement(elmnt) {
    const dragEle = elmnt;
    let pos1 = 0; let pos2 = 0; let pos3 = 0; let
      pos4 = 0;

    function elementDrag(e) {
      let eve = e;
      eve = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      dragEle.style.top = `${elmnt.offsetTop - pos2}px`;
      dragEle.style.left = `${elmnt.offsetLeft - pos1}px`;
    }

    function dragMouseDown(e) {
      const TempinitialPosition = e.target.getBoundingClientRect();
      setInitialPosition(TempinitialPosition);

      setMouseTransparent(true);
      let eve = e;
      eve = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;

      setInitMousePosWithinObject({
        x: e.clientX - TempinitialPosition.left,
        y: e.clientY - TempinitialPosition.top,
      });
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      window.addEventListener('keyup', rotateShip);
    }

    dragEle.onmousedown = dragMouseDown;
  }
  useEffect(() => {
    ship = document.getElementById(imgId);
    dragElement(ship);
    if (document.onmouseup !== null) {
      document.onmouseup = closeDragElement;
    }
  }, [horizontalOrientation, initMousePosWithinObject]);

  return (

    <img
      id={imgId}
      src={(horizontalOrientation ? 'images/arrow.svg' : 'images/arrow2.svg')}
      // src="images/arrow.svg"
      alt=""
      width={80 * (horizontalOrientation ? size : 1)}
      height={80 * (horizontalOrientation ? 1 : size)}
      // width={80 * size}
      // height={80}
      style={{ position: 'absolute', pointerEvents: (mouseTransparent ? 'none' : 'auto') }}
    />
  );
}
export default Ship;
