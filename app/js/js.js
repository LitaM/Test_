    $(document).ready(function(){
      $('.parallax-window').parallax({imageSrc: 'img/fon.png'});
           $(".carusel").slick({
         dots: true,
         arrows: false,
         slidesToShow: 3,
         slidesToScroll: 3
       });
       $(".big_image").slick({
         dots: true,
         arrows: false,
       });
     
    })