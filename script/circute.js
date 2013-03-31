/*
 * This file was AUTOMATICALLY generated from an ALPACA description.
 * EDIT AT YOUR OWN RISK!
 */


function in_nbhd_pred(pf, x, y, pred, nbhd) {
  var count = 0;
  for (var i = 0; i < nbhd.length; i++) {
    if (pred(pf.get(x+nbhd[i][0], y+nbhd[i][1]))) {
      count++;
    }
  }
  return count;
}

function in_nbhd_eq(pf, x, y, stateId, nbhd) {
  return in_nbhd_pred(pf, x, y, function(x) { return x === stateId; }, nbhd);
}

function evolve_playfield(pf, new_pf) {
  pf.map(new_pf, evalState, -1, -1, 1, 1);
}
function loadMapper(c) {
  if (c === ' ') return 'Space';
  if (c === '#') return 'Spark';
  if (c === '-') return 'Tail';
  if (c === '=') return 'Wire';
  if (c === 'N') return 'NAND';
};
function dumpMapper(s) {
  if (s === 'Space') return ' ';
  if (s === 'Spark') return '#';
  if (s === 'Tail') return '-';
  if (s === 'Wire') return '=';
  if (s === 'NAND') return 'N';
};
function eval_Space(pf, x, y) {
var id;
return 'Space';
}

function eval_NAND(pf, x, y) {
var id;
return 'NAND';
}

function eval_Wire(pf, x, y) {
var id;
if (((((((pf.get(x+-1,y+0)==='Spark')||(pf.get(x+1,y+0)==='Spark'))||(pf.get(x+0,y+-1)==='Spark'))||(pf.get(x+0,y+1)==='Spark'))||((pf.get(x+0,y+1)==='NAND')&&((pf.get(x+-1,y+1)==='Wire')||(pf.get(x+1,y+1)==='Wire'))))||((pf.get(x+0,y+-1)==='NAND')&&((pf.get(x+-1,y+-1)==='Wire')||(pf.get(x+1,y+-1)==='Wire'))))) {
  return 'Spark';
}
return 'Wire';
}

function eval_Spark(pf, x, y) {
var id;
if (((((((pf.get(x+-1,y+0)==='Tail')||(pf.get(x+1,y+0)==='Tail'))||(pf.get(x+0,y+-1)==='Tail'))||(pf.get(x+0,y+1)==='Tail'))||(((pf.get(x+0,y+1)==='NAND')&&(pf.get(x+-1,y+1)==='Spark'))&&(pf.get(x+1,y+1)==='Spark')))||(((pf.get(x+0,y+-1)==='NAND')&&(pf.get(x+-1,y+-1)==='Spark'))&&(pf.get(x+1,y+-1)==='Spark')))) {
  return 'Tail';
}
return 'Spark';
}

function eval_Tail(pf, x, y) {
var id;
if (true) {
  return 'Wire';
}
return 'Tail';
}

function evalState(pf, x, y) {
  var stateId = pf.get(x, y);
  if (stateId === 'Space') return eval_Space(pf, x, y);
  if (stateId === 'NAND') return eval_NAND(pf, x, y);
  if (stateId === 'Wire') return eval_Wire(pf, x, y);
  if (stateId === 'Spark') return eval_Spark(pf, x, y);
  if (stateId === 'Tail') return eval_Tail(pf, x, y);
}
