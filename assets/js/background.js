/**
 * this is the background class it handles the scrolling background
 */
class Background {
    constructor(game){
        this.game=game;
        this.layers = [];
        this.speed=0;
        var i=0;
        game.theme.background.layers.forEach(asset => {
            loadImage(asset, i++, (img, index)=>{
                var layer = {};
                layer.image=img;
                layer.width=img.width;
                layer.height=img.height;
                layer.index=game.theme.background.layers.length-index;
                this.layers[index]=layer;
            });
        });
    }

    draw(context){
        this.layers.forEach(layer => {
            var y1 = -this.game.view.y/layer.index;
            var y = y1-Math.floor(y1/layer.height)*layer.height;
            if(y>0)y-=layer.height;
            var x1 = -this.game.view.x/(layer.index+1)  ;
            var x = x1-Math.floor(x1/layer.width)*layer.width;
            if(x>0)x-=layer.width;
            while(x<this.game.view.width){
                context.drawImage(layer.image, 0, 0, layer.width, layer.height, x, -layer.height+this.game.view.height-y, layer.width, layer.height);
                x+=layer.width;
            }
            
        });
    }
}
