import React, { useEffect, useState, useRef } from 'react';

/**
 * Alusta kuvastava elementti
 * Liikuteltava drag and drop tyyliin
 * Käytetään vain alusten asettelussa
 */
function Ship({
  sprite, size, setShip, imgId,
}) {
  const [mouseTransparent, setMouseTransparent] = useState(false);
  const [horizontalOrientation, setHorizontalOrientation] = useState(true);
  const [initMousePosWithinObject, setInitMousePosWithinObject] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);

  const transparent = useRef(mouseTransparent);
  const position = useRef(initialPosition);
  const mousePosition = useRef(initMousePosWithinObject);
  const orientation = useRef(horizontalOrientation);

  const dimHor = useRef(null);
  const dimVer = useRef(null);

  const inputEl = useRef(null);
  let ship = null;

  const rotateShip = (es) => {
    if ((es.key === 'r' || es.key === 'R') && transparent.current) {
      if (!orientation.current) {
        orientation.current = true;
        ship.style.transform = 'rotate(0deg)';
        setHorizontalOrientation(true);
      } else {
        orientation.current = false;
        ship.style.transform = 'rotate(90deg)';
        setHorizontalOrientation(false);
      }
    }
  };

  const closeDragElement = () => {
    /* stop moving when mouse button is released: */
    // window.removeEventListener('keyup', rotateShip);
    document.onmouseup = null;
    document.onmousemove = null;
    document.onkeydown = null;

    transparent.current = false;
    setMouseTransparent(false);
    const grabCell = (orientation.current
      ? Math.floor(mousePosition.current.x / 60)
      : Math.floor(mousePosition.current.y / 60));
    setShip(imgId, grabCell, orientation.current);
  };

  function dragElement(elmnt) {
    const dragEle = elmnt;
    let pos1 = 0; let pos2 = 0; let pos3 = 0; let
      pos4 = 0;

    function elementDrag(e) {
      // let eve = e;
      // eve = e || window.event;
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
      position.current = TempinitialPosition;
      setInitialPosition(TempinitialPosition);
      transparent.current = true;
      setMouseTransparent(true);

      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;

      mousePosition.current = {
        x: e.clientX - TempinitialPosition.left,
        y: e.clientY - TempinitialPosition.top,
      };
      setInitMousePosWithinObject({
        x: e.clientX - TempinitialPosition.left,
        y: e.clientY - TempinitialPosition.top,
      });
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      document.onkeydown = rotateShip;
    }

    dragEle.onmousedown = dragMouseDown;
  }
  // suorittaa, kun elementit html elementit ovat olemassa
  useEffect(() => {
    ship = document.getElementById(imgId);
    ship.style.cursor = 'move';
    dragElement(ship);
  }, []);

  return (
    <img
      id={imgId}
      // src={(horizontalOrientation ? 'images/arrow.svg' : 'images/arrow2.svg')}
      src="images/arrow.svg"
      alt=""
      ref={inputEl}
      // width={60 * (horizontalOrientation ? size : 1)}
      // height={60 * (horizontalOrientation ? 1 : size)}
      width={60 * size}
      height={60}
      style={{
        position: (transparent.current ? 'absolute' : 'absolute'),
        pointerEvents: (transparent.current ? 'none' : 'auto'),
        top: '0%',
        left: '0%',
        // msTransform: 'translate(0%, 0%)',
        transform: 'translate(0%, 0%)',
        zIndex: 100,
        // left: (mouseTransparent ? 'inherit' : 'inherit'),
        // top: (mouseTransparent ? 'inherit' : 'inherit'),

      }}
    />
  );
}
export default Ship;
