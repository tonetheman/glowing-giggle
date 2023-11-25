


import { init, Sprite, GameLoop } from "./node_modules/kontra/kontra.mjs";
import { initPointer, track } from "./node_modules/kontra/kontra.mjs";
import { on, off, emit } from "./node_modules/kontra/kontra.mjs";

on("clicked", function(target) {
    console.log("clicked",target);
});

function main() {

    let { canvas,context } = init();

    initPointer();

    const testSprite  = Sprite({
        x : 20,
        y : 20,
        color : "red",
        width : 63,
        height : 63,
        selected : false,
        render : function() {
            if (this.selected) {
                this.context.fillStyle = 'yellow';
                this.context.fillRect(0,0,this.width+1,this.height+1);
            }
            this.context.fillStyle = this.color;
            this.context.fillRect(1, 1, this.width-1, this.height-1);     
        },
        onUp : function() {
            console.log("onUp clicked the testString")
            emit("clicked",this);
            if (this.selected) {
                this.selected = false;
            } else {
                this.selected = true;
            }
        }
    });
    track(testSprite);

    emit("game_start");

    let loop = GameLoop({
        update: function() {
            testSprite.update();
        },
        render: function() {
            testSprite.render();
        } 
    });
    loop.start()

}

window.onload = main;