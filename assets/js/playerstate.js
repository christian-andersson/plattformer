import Player from "./player";

export default class PlayerState {
    constructor(player){

    }
}

export class PlayerIdle extends PlayerState {
    constructor(player){
        super(player);
    }
}

export class PlayerWalking extends PlayerState {
    constructor(player){
        super(player);
    }
}

export class PlayerRunning extends PlayerState {
    constructor(player){
        super(player);
    }
}

export class PlayerJumping extends PlayerState {
    constructor(player){
        super(player);
    }
}

export class PlayerFalling extends PlayerState {
    constructor(player){
        super(player);
    }
}
export class PlayerHitting extends PlayerState {
    constructor(player){
        super(player);
    }
}

export class PlayerShooting extends PlayerState {
    constructor(player){
        super(player);
    }
}

export class PlayerDeath extends PlayerState {
    constructor(player){
        super(player);
    }
}
