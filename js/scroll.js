$(document).ready(function(){
    //부드러운 메뉴이동 플로그인
    $('.gnb a').click(function(e){
        e.preventDefault();
        //플로그인 메서드 사용방법
        //scrollTo(링크될 해시태그# || Y축픽셀값, 애니메이션 시간)
        $(window).scrollTo(this.hash || 0, 500);
    });
    
    //로딩시 GOTO TOP버튼 안보이도록 코딩
    // $(document).ready(function(){
    //     $('aside').hide();
    // })
    //스크롤 100px 이상 되었을대 GOTO TOP 버튼 나오도록 코딩
    var sa = 100;
    $(window).scroll(function(){
        var num = $('html,body').scrollTop();
        console.log(num);
        if(num>sa){
            $('aside div').stop().fadeIn();
        }else{
            $('aside div').stop().fadeOut();
        }
    });

    //animate 부드러운 스크롤탑 이동
    //animate()사용, 스크로탑 0 으로 이동
    $('.top').click(function(e){
        $('html,body').stop().animate({scrollTop:0},1000,'swing');
        e.preventDefault();
    });
});