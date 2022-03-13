import React, { useEffect } from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';
import Ship from './Ship';

// https://www.w3schools.com/howto/howto_js_draggable.asp
function GameBoard(info) {
  const boardA = [];
  console.log(info.info, info.info.y);
  const x = parseInt(info.info.x, 10);
  const y = parseInt(info.info.y, 10);
  console.log(x, y);

  for (let index = 0; index < 8; index += 1) {
    boardA.push([]);
    for (let a = 0; a < 8; a += 1) {
      boardA[index].push(`${index}${a}`);
    }
  }

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const draggable = document.getElementById(data);
    // console.log(draggable.style.left);
    // console.log(ev.target.style.left);
    // draggable.style.left = 0;
    // draggable.style.top = 0;

    const rect = ev.target.getBoundingClientRect();
    console.log(rect);

    // console.log(ev.target);
    // draggable.style.transform = 'rotate(180deg)';
    draggable.style.left = `${rect.left}px`;
    draggable.style.top = `${rect.top}px`;
    // console.log(draggable.getBoundingClientRect());

    // ev.target.appendChild(document.getElementById(data));
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
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function dragMouseDown(e) {
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
    // code to run after render goes here
    dragElement(document.getElementById('da2dsa'));

    const myPics = document.getElementById('gridi');
    myPics.addEventListener('mouseup', (e) => {
      const grid = e.target;
      console.log(grid);
    });
  }, []);
  return (
    <>
      <Ship imgId="da2dsa" />

      <Grid item xs={12} id="gridi">

        {boardA.map((row) => (
          <Grid container justifyContent="center" spacing={0}>
            {row.map((value) => (
              <Grid key={value} item justifyContent="center">
                <Paper
                  sx={{
                    height: 80,
                    width: 80,
                    // opacity: 0.5,
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff'),
                  }}
                  style={{ alignContent: 'center' }}
                  variant="outlined"
                  onDrop={drop}
                  onDragOver={allowDrop}
                >
                  {/* <Ship aax={value} /> */}
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default GameBoard;
