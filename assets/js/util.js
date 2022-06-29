async function loadJson(asset, visitedAssets){
    if(visitedAssets === undefined) {
        visitedAssets = new Set()
    }
    if(!visitedAssets.has(asset)){
        visitedAssets.add(asset);
        var response = await fetch(asset);
        let json = await response.json();
        await loadIncludes(json,visitedAssets);
        return json;
    }

    return "";
}

async function loadIncludes(obj, visitedAssets){
    for (var key in obj) {
        //console.log("loadIncludes: "+key+": "+);
        if (obj.hasOwnProperty(key)) {
            if(typeof obj[key] === 'string' && obj[key].startsWith('_include_:')){
                let asset =  obj[key].substring(10);
                obj[key] = await loadJson(asset, visitedAssets);
            } else if (typeof obj[key] === 'object'){
                await loadIncludes(obj[key], visitedAssets);
            }
        }
    }
}

export async function loadTheme(theme){
    return await loadJson("assets/themes/"+theme+".json");
}
export async function loadMap(map){
    return await loadJson("assets/maps/"+map+".json");
}

async function loadJavascriot(script){
    var js = document.createElement("script");
    js.src = script;
    document.head.appendChild(js);
}

export async function loadImage(image, index, callback){
    var img = new Image();
    img.onload = function (){
        callback(img, index);
    }
    img.src=image;
    return img;
}

export function flip(src,target){
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