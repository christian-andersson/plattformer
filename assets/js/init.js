import Game from "./game.js"
window.addEventListener('load', function() {
    const canvas = document.getElementById('gamearea');
    const ctx = canvas.getContext('2d');
    canvas.width=800;
    canvas.height=500;
    let gameId=window.location.hash;
    if(gameId==="") gameId="000-000-000";
    

    const game = new Game(canvas,gameId);
    game.init().then(r =>{
        let prevTimestamp=0;
        function animate(timestamp){
            if(prevTimestamp===0){
                prevTimestamp=timestamp;
            }

            ctx.clearRect(0,0,canvas.width, canvas.height);
            game.update(timestamp-prevTimestamp);
            game.draw(ctx);
            prevTimestamp=timestamp
            requestAnimationFrame(animate);
        }
        animate(0);
    });
});