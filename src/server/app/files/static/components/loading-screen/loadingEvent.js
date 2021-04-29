
function initializeEndOfLoading() {
    const loader = document.getElementById('loadingScreen');
    loader.documentLoaded();
    setTimeout(() => {
        loader.style.display = "none";
    }, 700)
}