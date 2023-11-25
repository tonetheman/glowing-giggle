

import { init, Sprite, GameLoop } from "./node_modules/kontra/kontra.mjs";
import { initPointer, track } from "./node_modules/kontra/kontra.mjs";
import { on, off, emit } from "./node_modules/kontra/kontra.mjs";

const GRID_SIZE = 48;
const TILE_SIZE = GRID_SIZE-1;
const ROWS = 6;
const COLS = 12;
let state = null;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const NOTHING_CLICKED = 0;
const ONE_CLICKED = 1;

class GameState { 
    constructor() {
        this.state = NOTHING_CLICKED;
    }
    render() {

    }
    update() {

    }
}

class Grid {
    constructor(r,c) {
        this.r = r;
        this.c = c;
        this.data = [];
        for(let i=0;i<this.r;i++) {
            let tmp = [];
            for (let j=0;j<this.c;j++) {
                tmp[j] = 0;
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
                const color = getRandomInt(1,4);
                let color_string = "";
                if (color===1) color_string = "green";
                if (color===2) color_string = "red";
                if (color===3) color_string = "blue";

                tmp[j] = Sprite({
                    x: x,
                    y: y,
                    width : 47, height : 47,
                    color : color_string,
                    onUp: () => {
                        emit("click", {r:i,c:j,color:color_string});
                    }
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
    console.log("item clicked",item)
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
            grid.render();
            state.render();
        } 
    });
    loop.start()

}

window.onload = main;