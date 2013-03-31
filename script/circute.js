/*
 * This file was AUTOMATICALLY generated from an ALPACA description.
 * EDIT AT YOUR OWN RISK!
 */

Playfield = function() {
    this._store = {};
    this.min_x = undefined;
    this.min_y = undefined;
    this.max_x = undefined;
    this.max_y = undefined;
    this.default = undefined;

    this.get = function(x, y) {
        var state = this._store[x+','+y];
        return state === undefined ? this.default : state;
    };

    this.put = function(x, y, value) {
        if (value === this.default) {
            delete this._store[x+','+y];
        } else {
            this._store[x+','+y] = value;
        }
    };

    this.recalculate_limits = function() {
        this.min_x = undefined;
        this.min_y = undefined;
        this.max_x = undefined;
        this.max_y = undefined;

        for (var cell in this._store) {
            var pos = cell.split(',');
            var x = parseInt(pos[0], 10);
            var y = parseInt(pos[1], 10);
            if (this.min_x === undefined || this.min_x > x)
                this.min_x = x;
            if (this.max_x === undefined || this.max_x < x)
                this.max_x = x;
            if (this.min_y === undefined || this.min_y > y)
                this.min_y = y;
            if (this.max_y === undefined || this.max_y < y)
                this.max_y = y;
        }
    };
};

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
  for (var y = pf.min_y - 1; y <= pf.max_y - -1; y++) {
    for (var x = pf.min_x - 1; x <= pf.max_x - -1; x++) {
      new_pf.put(x, y, evalState(pf, x, y));
    }
  }
  new_pf.recalculate_limits();
}
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
