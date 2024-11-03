$(function(){
    $('.slide_gallery').bxSlider({
        mode: 'fade',
        auto: true,
        speed: 1000,
        autoControls: false,
        autoHover: true,
        pager: true,
        slideWidth: 1920
    });

    $('.menu_toggle_btn').click(function(){
        $('.gnb').stop().toggle();
    });
});
