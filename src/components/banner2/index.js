import ReactSwiper from 'reactjs-swiper';

const Banner2 = () => {
  const items = [{
    image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg',
    title: '图片1',
    link: 'http://jd.com'
  }, {
    image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg',
    title: '图片2',
  }, {
    image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg',
    title: '图片3',
    link: 'http://jd.com'
  }, {
    image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
    title: '图片4',
  }];

  const swiperOptions = {
    preloadImages: true,
    autoplay: 4000,
    autoplayDisableOnInteraction: false,
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 100,
      shadowScale: 0.6
    }
  };
  return (
    <ReactSwiper swiperOptions={swiperOptions} showPagination items={items}
                 className="swiper-example" />
  );

}
export default Banner2
