const PICTURE_COUNT = $('.company-element').length;


$(document).ready(function(){
    var curIndex = 0;
    var insertImgInterval = setInterval(() => {
        $('.company-element').eq(curIndex).css('background-image', `url(${baseURL}/static/landing_page/img/companies/company_${curIndex + 1}.png)`)
        $('.company-element').eq(curIndex).addClass("fadeIn");
        
        if (curIndex == PICTURE_COUNT - 1) {
            clearInterval(insertImgInterval);
        }
        curIndex++;
    }, 150);
    // left side test

})