import React, { useEffect, useState } from 'react';

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
      ? Math.floor(initMousePosWithinObject.x / 60)
      : Math.floor(initMousePosWithinObject.y / 60));
    setShip(imgId, initialPosition, grabCell, horizontalOrientation);
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
      setInitialPosition(TempinitialPosition);

      setMouseTransparent(true);
      // let eve = e;
      // eve = e || window.event;
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
  // suorittaa, kun elementit renderöity tai jos komponentin tietyt tilat muuttuvat
  useEffect(() => {
    ship = document.getElementById(imgId);
    dragElement(ship);
    // Jotkut funktiot ovat sidottuina käyttäjän antamiin inputteihin.
    // Sidotut funktiot säilyttävät vanhaa tietoa komponentin tilasta.
    // Tällä on tarkoitus päivittää funktiossa olevat tiedot.
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
      width={60 * (horizontalOrientation ? size : 1)}
      height={60 * (horizontalOrientation ? 1 : size)}
      // width={60 * size}
      // height={60}
      style={{ position: 'absolute', pointerEvents: (mouseTransparent ? 'none' : 'auto') }}
    />
  );
}
export default Ship;
