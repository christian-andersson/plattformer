import View from './view.js'
import InputHandler from './inputhandler.js'
import Background from './background.js'
import Foreground from './foreground.js'
import Player from './player.js'
import Pause from './pause.js'
import {loadMap, loadTheme} from './util.js'

export default class Game{
    constructor(canvas, mapId) {
        this.width=62*64;
        this.height=10*64;
        this.mapId = mapId;
        this.view = new View(this, canvas.width, canvas.height);
        this.input = new InputHandler();
        this.gravity=1;
        this.paused=false;
        this.canvas = canvas;
    }

    async init() {
        this.map = await loadMap(this.mapId);
        if(this.map.hasOwnProperty('settings') && this.map.settings.hasOwnProperty('theme')){
            this.themeId = this.map.settings.theme;
        } else {
            this.themeId = "dawn2";
        }
        this.theme = await loadTheme(this.themeId);
        this.backgroundLayer = new Background(this);
        this.foregroundLayer = new Foreground(this);
        this.player = new Player(this);
        this.pauseLayer = new Pause(this);
        if(this.theme.hasOwnProperty('background') && this.theme.background.hasOwnProperty('color')){
            this.canvas.style.backgroundColor=this.theme.background.color;
        }
        
        //this.forgroundLayer = new Foreground(this.view.width,this.view.height, this.assets);
    }
    
    update(timeDiff){
        this.pauseLayer.update(this.input);
        if(!this.paused){
            this.player.update(this.input, timeDiff);
            this.view.update(this.player);
        }
    }

    draw(ctx) {
        this.backgroundLayer.draw(ctx);
        //this.platforms.draw(ctx);
        //this.enemies.draw(ctx);
        this.player.draw(ctx);
        this.foregroundLayer.draw(ctx);
        if(this.paused){
            this.pauseLayer.draw(ctx);
        }
    }
}