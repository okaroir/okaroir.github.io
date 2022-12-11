
const allSliders = document.querySelectorAll('.swiper');

for( i=0; i< allSliders.length; i++ ) {

    allSliders[i].classList.add('swiper-' + i);

    var slider = new Swiper('.swiper-' + i, {
        slidesPerView: 1,
        centered:true,
        breakpoints: {
            700: {
                slidesPerView: 7,
            },
            600: {
                slidesPerView: 6,
            },
            500: {
                slidesPerView: 4,
            },
            400: {
                slidesPerView: 2,
            },
            300: {
                slidesPerView: 1,
            }
        },
        navigation: {
            nextEl: '.swiper-' + i + ' .swiper-button-next',
            prevEl: '.swiper-' + i + ' .swiper-button-prev',
        },
    });

}