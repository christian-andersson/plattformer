export default class Pause {
    constructor(game){
        this.game=game;
    }

    update(input){
        if(this.game.paused){
            if(input.keys.indexOf(' ')>-1){
                this.game.paused=false;
            }
        } else if(input.keys.indexOf('Escape')>-1){
            this.game.paused=true;
        }
        if(!document.hasFocus()){
            this.game.paused=true;
        }

        if(this.game.paused) {
            input.keys = [];
        }
    }

    draw(ctx){
        var target = new Image();
        target.src = this.game.canvas.toDataURL();
        ctx.save();
        ctx.filter="blur(4px)";
        ctx.drawImage(target,0,0);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "#cccccc";
        ctx.font = '100px Arial';
        ctx.textBaseline = 'middle'; 
        ctx.textAlign = 'center'; 

        ctx.fillText("Paused!" , (this.game.canvas.width/2), (this.game.canvas.height/2));
        ctx.font = '20px Arial';
        ctx.fillText("Press space to continue" , (this.game.canvas.width/2), (this.game.canvas.height/2)+50+10);
        ctx.restore();
    }
}
