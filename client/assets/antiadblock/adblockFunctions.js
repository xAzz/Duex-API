function adBlockDetected() {
    $('body').empty();
    $('body').attr("style", "background:#fff!important");
    $('body').append('<h1 class="antiadblock-title">Duex.io</h1><h3 class="antiadblock-description">Duex.io no permite el uso de Adblock. Hacemos esto porque gracias a los anuncios que se encuentran en el juego nosotros podemos pagar los servidores. Gracias</h3><h3 class="antiadblock-description">Duex.io doesn\'t accept adblock usage. This is because thanks to the ads that are in this page we can pay the servers. Thanks.</h3>');
    //$("#overlays, #overlays2").fadeToggle(3000);
    console.log('Please disable adblock to support us!');
    document.getElementById('canvas').remove();
}

function adBlockNotDetected() {
    console.log('Client does not have adblock enabled');
}

if (typeof fuckAdBlock === 'undefined') {
    adBlockDetected();
} else {
    fuckAdBlock.setOption({
        debug: true
    });
    fuckAdBlock.onDetected(adBlockDetected).onNotDetected(adBlockNotDetected);
}
setInterval(function() {
    if (typeof fuckAdBlock === 'undefined') {
        adBlockDetected();
    } else {
        fuckAdBlock.onDetected(adBlockDetected).onNotDetected(adBlockNotDetected);
        fuckAdBlock.check();
    }
}, 900000);