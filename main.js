

import { init, Sprite, GameLoop } from "./node_modules/kontra/kontra.mjs";
import { initPointer, track } from "./node_modules/kontra/kontra.mjs";
import { on, off, emit } from "./node_modules/kontra/kontra.mjs";
import { getRandomInt } from "./randomfunc.js";
import {PF} from "./node_modules/pathfinding/visual/lib/pathfinding-browser.min.js";

const GRID_SIZE = 48;
const TILE_SIZE = GRID_SIZE-1;
const ROWS = 6+2; // 6 usable 2 wrapped around
const COLS = 12+2; // 12 usable 2 wrapped around
let state = null;
const pf_grid = new PF.Grid(ROWS,COLS);

const NOTHING_CLICKED = 0;
const ONE_CLICKED = 1;

class GameState { 
    constructor() {
        this.state = NOTHING_CLICKED;
        this.first = null;
    }
    render() {
        if (state.state===ONE_CLICKED) {
            const x = state.first.col * TILE_SIZE;
            const y = state.first.row * TILE_SIZE;
            // need to tell the tile
            // to draw a high light
            // so player will know
        }
    }
    update() {

    }
}

function get_color_string(color) {
    if (color===1) return "green";
    if (color===2) return "red";
    if (color===3) return "blue";
    if (color===4) return "yellow";
    if (color===5) return "pink";
    return "white";
}

class Grid {
    constructor(r,c) {
        this.r = r;
        this.c = c;
        this.data = [];
        for(let i=0;i<this.r;i++) {
            let tmp = [];
            for (let j=0;j<this.c;j++) {
                if ((i===0) || (j===0) || (j===COLS-1) || (i===ROWS-1)) {
                    tmp[j] = 0;
                } else {
                    tmp[j] = getRandomInt(1,6);
                }
            }
            this.data[i] = tmp;
        }
        
        let x = 0;
        let y = 0;
        this.sprites = [];
        for (let i=0;i<this.r;i++) {
            let tmp = [];
            for (let j=0;j<this.c;j++) {
                x += 48;
                const color = this.data[i][j];
                const color_string = get_color_string(color);

                tmp[j] = Sprite({
                    x: x,
                    y: y,
                    width : 47, height : 47,
                    color : color_string,
                    selected : false,
                    onUp: function() {
                        emit("click", {r:i,c:j,color:color_string});
                        
                        // check state
                        if ((state.state===ONE_CLICKED) || (state.state===NOTHING_CLICKED)) {


                            if (this.selected) {
                                this.selected = false;
                            } else {
                                this.selected = true;
                            }            
    

                        }

                    },
                    render : function() {
                        if (this.selected) {
                            this.context.fillStyle = 'yellow';
                            this.context.fillRect(0,0,this.width+1,this.height+1);
                        }
                        this.context.fillStyle = this.color;
                        this.context.fillRect(1, 1, this.width-1, this.height-1);     
                    },            
                });
                track(tmp[j]);
            }
            x = 0;
            y += 48;
            this.sprites[i] = tmp;
        }
    }

    set(r,c,v) {
        this.data[r][c] = v;
    }

    get(r,c) {
        return this.data[r][c];
    }

    render() {
        for (let i=0;i<this.r;i++) {
            for (let j=0;j<this.c;j++) {
                this.sprites[i][j].render();
            }
        }
    }

    update() {

    }
}

on("game_start", () => {
    console.log("game started!");
});

on("click", (item) => {
    console.log("item clicked",item);
    if (state.state===NOTHING_CLICKED) {
        // keep up with what was clicked
        state.first = {
            row : item.r,
            col : item.c,
            color : item.color
        }
        // draw it differently now

        // change state to ONE_CLICKED
        state.state = ONE_CLICKED;

        console.log(state);
    } else if (state.state===ONE_CLICKED) {
        // does the color match the first click?
        // change state?SS
    }
});

function main() {

    let { canvas,context } = init();

    initPointer();

    // 6 rows and 12 cols
    let grid = new Grid(ROWS,COLS);
    
    state = new GameState();

    emit("game_start");

    let loop = GameLoop({
        update: function() {
            grid.update();
            state.update();
        },
        render: function() {
            state.render();
            grid.render();
        } 
    });
    loop.start()

}

window.onload = main;