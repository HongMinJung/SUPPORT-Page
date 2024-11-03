// .swiper-container = 구조의 클래스값
var swiper = new Swiper('.swiper-container', {
    // 슬라이드 보이는 갯수
    slidesPerView: 1.52,
    // 슬라이드 사이의 간격
    spaceBetween: '10.333333333333%',
    // 슬라이드 반복 여부
    loop: true,
    // 그룹수 맞추기 = 안 맞을경우 빈칸으로 채우기 여부
    // (if) 슬라이드가 3개가 나와야 하는데 1개만 있다면 2개는 빈칸으로 자동으로 채워서 3개를 만들어 줌
    loopFillGroupWithBlank: true,
    // true인 경우 활성 슬라이드는 항상 가운데에 배치(왼쪽아님)
    centeredSlides: true,
    // 넘버링
    pagination: {
        // 적용시킨 구조에 코딩된 클래스명
        el: '.swiper-pagination',
        type: 'bullets',
        // bullets 적용후, 클릭시 해당슬라이드 링크여부
        clickable: true,
        type: 'fraction',
    },
    // 네이게이션 좌우화살표
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});