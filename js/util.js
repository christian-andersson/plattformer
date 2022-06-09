async function loadAssets(asset){
    var response = await fetch(asset);
    return await response.json();
}

async function loadTheme(theme){
    return await loadAssets("assets/themes/"+theme+".json");
}
async function loadMap(map){
    return await loadAssets("assets/maps/"+map+".json");
}

async function loadJavascriot(script){
    var js = document.createElement("script");
    js.src = script;
    document.head.appendChild(js);
}

async function loadImage(image, index, callback){
    var img = new Image();
    img.onload = function (){
        callback(img, index);
    }
    img.src=image;
    return img;
}

function flip(src,target){
    target = new Image();
    var c = document.createElement('canvas');
    c.width = src.width;
    c.height = src.height;
    var ctx = c.getContext('2d');
    ctx.scale(-1,1);
    ctx.drawImage(src,-src.width,0);
    target.src = c.toDataURL();

    return target;
}