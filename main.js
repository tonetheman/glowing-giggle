

import { init, Sprite, GameLoop } from "./node_modules/kontra/kontra.mjs";

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
                x += 64;
                tmp[j] = Sprite({
                    x: x,
                    y: y,
                    width : 63, height : 63,
                    color : 'green'
                });
            }
            x = 0;
            y += 64;
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

function main() {
    let { canvas,context } = init();

    let grid = new Grid(3,3);
    
    let loop = GameLoop({
        update: function() {
            grid.update();
        },
        render: function() {
            grid.render();
        } 
    });
    loop.start()

}

window.onload = main;