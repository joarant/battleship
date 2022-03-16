import React, { useEffect, useState } from 'react';

function Ship({
  sprite, size, beingMoved, imgId,
}) {
  const [mouseTransparent, setMouseTransparent] = useState(false);

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
      document.onmouseup = null;
      document.onmousemove = null;
      setMouseTransparent(false);
      // beingMoved('');
    }

    function dragMouseDown(e) {
      beingMoved(imgId);
      setMouseTransparent(true);
      let eve = e;
      eve = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    dragEle.onmousedown = dragMouseDown;
  }
  useEffect(() => {
    dragElement(document.getElementById(imgId));
  }, []);

  return (

    <img
      id={imgId}
      src="images/arrow.svg"
      alt=""
      width={120}
      height={100}
      style={{ position: 'absolute', pointerEvents: (mouseTransparent ? 'none' : 'auto') }}
    />
  );
}
export default Ship;
