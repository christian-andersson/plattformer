export default class View {
    constructor(game, viewWidth, viewHeight){
        this.width=viewWidth;
        this.height=viewHeight;
        this.x=0;
        this.y=0;
        this.game = game;
    }

    update(player){
        //center view on player
        this.x=player.x+player.width/2-this.width/2;
        this.y=player.y+player.height/2-this.height/2;

        //make sure that the view does not go outside game boundrary
        this.x= Math.min(Math.max(this.x,0),this.game.width-this.width) ;
        this.y= Math.min(Math.max(this.y,0),this.game.height-this.height) ;
    }

    drawImgInView(ctx, img, sx, sy, sw, sh, dx, dy) {
        ctx.drawImage(img,sx,sy,sw,sh,this.xWithinView(dx),this.yWithinView(-dy+this.height-sh),sw,sh)
    }

    xWithinView(xOrig){
        return xOrig-this.x;
    }
    yWithinView(yOrig){
        return yOrig-this.y;
    }
}
