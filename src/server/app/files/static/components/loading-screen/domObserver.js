
const observer = new MutationObserver( list => {
    const evt = new CustomEvent('dom-changed', {detail: list});
    document.body.dispatchEvent(evt)
  });
  observer.observe(document.body, {attributes: true, childList: true, subtree: true});


document.body.addEventListener('dom-changed', e => domHasChanged());

var myTimeOut, hasLoaded = false, avg = 0, last = 0;

function domHasChanged() {

    if (hasLoaded) {
        return;
    }


    if (last == 0) {
        last = Date.now();
    }

    var now = Date.now();
    var diff = now - last;

    avg = Math.floor((avg + diff) / 2);

    if (avg < 20) {
        avg += 200;
    }

    last = now;




    myTimeOut == undefined ? console.log("first change") : clearTimeout(myTimeOut);
    myTimeOut = setTimeout(() => {
        console.log("DOM HAS NOT CHANGED")
        const loader = document.getElementById('loadingScreen');
        loader.documentLoaded();
        setTimeout(() => {
            loader.style.display = "none";
        }, 700)

        hasLoaded = true;
    }, avg * 4);
};