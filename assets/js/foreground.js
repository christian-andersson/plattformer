import {loadImage} from "./util.js"

/**
 * this is the background class it handles the scrolling background
 */
 export default class Foreground {
    constructor(game){
        this.game=game;
        this.layers = [];
        this.speed=0;
        var i=0;
        game.theme.foreground.layers.forEach(asset => {
            loadImage(asset, i++, (img, index)=>{
                var layer = {};
                layer.image=img;
                layer.width=img.width;
                layer.height=img.height;
                layer.index=game.theme.foreground.layers.length-index;
                this.layers[index]=layer;
            });
        });
    }

    draw(context){
        this.layers.forEach(layer => {
            var x = -this.game.view.x;
            if(x>0)x-=layer.width;
            while(x<this.game.view.width){
                context.drawImage(layer.image, 0, 0, layer.width, layer.height, x, -layer.height+this.game.view.height, layer.width, layer.height);
                x+=layer.width;
            }
        });
    }
}