import {loadImage, flip} from './util.js';

export default class Player {
    constructor(game){
        this.game = game;
        this.x=0;
        this.y=this.game.theme.bottom;
        this.speed= {
            horizontal:0,
            vertical: 0,
            image:1
        };
        this.onGround=true;
        this.state = this.game.theme.player.states;
        this.imgIndex=0;
        this.state.current = this.state.idle;
        this.state.last = this.state.current;
        this.direction=1;
        loadImage(game.theme.player.image,0, (img, index) => {
            this.image = img
            this.mirrorImage = flip(this.image);
        });
    }
    update(input, timeDiff){
        this.state.last = this.state.current;
        if(input.keys.indexOf('ArrowRight')>-1){
            this.state.current=input.keys.indexOf('Shift')>-1?this.state.walk:this.state.run;
            this.direction=1;
        } else if(input.keys.indexOf('ArrowLeft')>-1){
            this.state.current=input.keys.indexOf('Shift')>-1?this.state.walk:this.state.run;
            this.direction=-1;
        } else {
            if(this.onGround){
                this.state.current=this.state.idle;
            }
        }

        if((typeof this.state.current.speed !== "undefined") && (typeof this.state.current.speed.horizontal !== "undefined")){
            this.speed.horizontal=this.state.current.speed.horizontal;
        } else {
            this.speed.horizontal=0;
        }

        if(input.keys.indexOf('ArrowUp')>-1 || !this.onGround){
            this.state.current=this.state.jump
            if(this.onGround) {
                this.speed.vertical=15;
                this.onGround=false;
            }
        } 
        
        if(!this.onGround){
            this.speed.vertical-=this.game.map.settings.gravity;
        } else {
            this.speed.vertical=0;
        }
        this.x+=this.direction*this.speed.horizontal;
        this.y+=this.speed.vertical;

        //Keep player within game Area
        this.x= Math.min(Math.max(this.x,0),this.game.width-this.state.current.image.width);
        this.y= Math.min(Math.max(this.y,this.game.theme.bottom),this.game.height-this.state.current.image.height) ;

        if(this.state.current!=this.state.last){
            this.imgIndex=0;
        } else {
            let fps = this.state.current.image.fps ?? this.game.theme.player ?? 30;
            let imgTime=1000/fps;

            this.imgIndex+=timeDiff/imgTime;
            while(this.imgIndex >= this.state.current.image.count){
                this.imgIndex-=this.state.current.image.count;
            }
        }

        if(this.y===this.game.theme.bottom){
            this.speed.vertical=0;
            this.onGround=true;
        }
    }

    draw(ctx){
        if(this.game && this.game.view && this.image && this.mirrorImage){
            if(this.direction>0){
                this.game.view.drawImgInView(ctx,this.image,Math.trunc(this.imgIndex)*this.state.current.image.width,this.state.current.image.yOffset,this.state.current.image.width,this.state.current.image.height,this.x,this.y);
            } else {
                this.game.view.drawImgInView(ctx,this.mirrorImage,this.mirrorImage.width-Math.trunc(this.imgIndex+1)*this.state.current.image.width,this.state.current.image.yOffset,this.state.current.image.width,this.state.current.image.height,this.x,this.y);
            }
        }
    }
}