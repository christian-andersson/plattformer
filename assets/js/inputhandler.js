export default class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e=> {
            if(this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key)
            }
        });
        window.addEventListener('keyup', e=> {
            if(this.keys.indexOf(e.key)>=0){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
        });
    }
}
