import React from 'react';
import 'owl.carousel';
interface CarouselProps {
  images: string[];
}

interface CarouselProps {
  images: string[];
}

class Carousel extends React.Component<CarouselProps> {

  componentDidMount() {

    $('.owl-carousel').owlCarousel({
      loop: true,
      items: 2.5,
      autoplay: true,
      autoplayTimeout: 5000,
      video: true,
      autoHeight: true,
      autoplaySpeed: 1000,
      margin: 0,
      autoplayHoverPause: true,
      nav: true,
      navText: [
          '<img src="./gluedin/arrow-small-right.svg">',
          '<img src="./gluedin/arrow-small-left-g.svg">',
      ],
      dots: false,
      responsive: {
          0: {
              items: 2.5,
              nav: false,
          },
          600: {
              items: 4.5,
              nav: false,
          },
          1000: {
              items: 4,
              loop: false,
          },
      },
    });
  }

  render() {
    const { images } = this.props;
    return (
      <div className="row owl-carousel owl-theme">
        {images.map((image:any, index) => (
          <>
            <div className="box text-center" style={{ "width": "140px !important" }} key={image.id}>
              <div className="img-box open-video-detail" id={image.id} 
                style={{
                  "background": `url("${image.thumbnail}") center`,
                  "height": "100px !important",
                }}>
                <span className="av-icon">
                  <img alt='content icon' src="./gluedin/folder-icon.svg" /></span>
              </div>
            </div>
          </>
        ))}
      </div>
    );
  }
}

export default Carousel;