class Player {
    constructor(game){
        this.game = game;
        this.width=32;
        this.height=64;
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
    update(input){
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
        if((typeof this.state.current.speed.horizontal !== "undefined")){
            this.speed.horizontal=this.state.current.speed.horizontal;
        }

        if(input.keys.indexOf('ArrowUp')>-1 || !this.onGround){
            this.state.current=this.state.jump
            if(this.onGround) {
                this.speed.vertical=15;
                this.onGround=false;
            }
        } 
        if((typeof this.state.current.speed.image !== "undefined")){
            this.speed.image=this.state.current.speed.image;
        }
        
        if(!this.onGround){
            this.speed.vertical-=this.game.map.gravity;
        } else {
            this.speed.vertical=0;
        }
        this.x+=this.direction*this.speed.horizontal;
        this.y+=this.speed.vertical;

        //Keep player within game Area
        this.x= Math.min(Math.max(this.x,0),this.game.width-this.width) ;
        this.y= Math.min(Math.max(this.y,this.game.theme.bottom),this.game.height-this.height) ;

        if(this.state.current!=this.state.last){
            this.imgIndex=0;
        } else {
            this.imgIndex+=this.speed.image;
            if(this.imgIndex >= this.state.current.count){
                this.imgIndex=0;
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
                this.game.view.drawImgInView(ctx,this.image,Math.trunc(this.imgIndex)*this.state.current.width,this.state.current.yOffset,this.state.current.width,this.state.current.height,this.x,this.y);
            } else {
                this.game.view.drawImgInView(ctx,this.mirrorImage,this.mirrorImage.width-Math.trunc(this.imgIndex+1)*this.state.current.width,this.state.current.yOffset,this.state.current.width,this.state.current.height,this.x,this.y);
            }
        }
    }
}