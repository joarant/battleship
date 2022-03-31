import React, { useEffect, useState } from 'react';

function Ship({
  sprite, size, setShip, imgId,
}) {
  const [mouseTransparent, setMouseTransparent] = useState(false);
  const [horizontalOrientation, setHorizontalOrientation] = useState(true);

  let initialPosition;
  let ship = null;
  let initMousePosWithinObject = null;

  const rotateShip = (es) => {
    if (es.key === 'r' || es.key === 'R') {
      if (!horizontalOrientation) {
        setHorizontalOrientation(true);
      } else {
        setHorizontalOrientation(false);
      }
    }
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

    function closeDragElement() {
      /* stop moving when mouse button is released: */
      window.removeEventListener('keyup', rotateShip);
      document.onmouseup = null;
      document.onmousemove = null;
      setMouseTransparent(false);

      const grabCell = (horizontalOrientation
        ? Math.floor(initMousePosWithinObject.x / 80)
        : Math.floor(initMousePosWithinObject.y / 80));
      console.log(grabCell, 'grabcell');
      setShip(imgId, initialPosition, grabCell, horizontalOrientation);
    }

    function dragMouseDown(e) {
      initialPosition = e.target.getBoundingClientRect();
      setMouseTransparent(true);
      let eve = e;
      eve = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;

      initMousePosWithinObject = {
        x: e.clientX - initialPosition.left,
        y: e.clientY - initialPosition.top,
      };

      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      window.addEventListener('keyup', rotateShip);
    }

    dragEle.onmousedown = dragMouseDown;
  }
  useEffect(() => {
    console.log('dasdxxxxx');
    ship = document.getElementById(imgId);
    dragElement(ship);
  }, [horizontalOrientation]);

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
