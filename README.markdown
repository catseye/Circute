The Circute Cellular Automaton
==============================

*Note: parts of this readme were cribbed from the esolangs.org
[wiki entry for Circute](http://esolangs.org/wiki/Circute), which is in the
public domain.*

**Circute** is a two-dimensional five-state cellular automaton.  It was
designed by Chris Pressey in 2005 as a test of the so-called "wire-crossing
problem".  It is similar in some respects to WireWorld, but attempts to act
more like an actual digital electronic circuit, providing as its basic
mechanism the only logic gate you ever really need, the NAND gate.

Syntax
------

*   ` ` - blank. Never changes.
*   `=` - wire. Sparks pass through.
*   `-` - tail. Used to make sparks act more like snakes.
*   `#` - spark. These spread across wires.
*   `N` - NAND gate. Never changes itself, but if there's a free wire
          directly along the left or the right, send a message along any
          wire directly above or below. 

Implementation
--------------

Circute has a simple description written in ALPACA.  This distribution
contains both that description, and a Perl script compiled from it which
animates the cellular automaton.
