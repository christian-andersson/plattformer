import Game from "./game.js"
window.addEventListener('load', function() {
    const canvas = document.getElementById('gamearea');
    const ctx = canvas.getContext('2d');
    canvas.width=800;
    canvas.height=500;

    const game = new Game(canvas,"000-000-000");
    game.init().then(r =>{
        function animate(timestamp){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            game.update();
            game.draw(ctx);
            requestAnimationFrame(animate);
        }
        animate();
    });
});