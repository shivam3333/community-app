
import React, { useEffect,useState,useRef } from 'react';
import gluedin from "gluedin";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../assets/css/custom.css';
import '../../assets/css/responsive.css'
import './FreshArrival.css'

function TrendingVideos(){
    const owlCarouselRef = useRef<HTMLDivElement>(null);  
  var data:any; 
  var setData:any;   
[data, setData] = useState(null);

  useEffect(() => {
      async function fetchData() {
          try {
            
              var curatedContentModuleObj = new gluedin.GluedInCuratedContentModule();
              var curatedContentModuleResponse =
                  await curatedContentModuleObj.getCuratedContentList("discover");
              if (curatedContentModuleResponse.status === 200) {
                  let trendingVideos = curatedContentModuleResponse.data.result.find((rail:any)=> rail.railId === "railId_3");
                  
                  setData(trendingVideos);
              }

          } catch (error) {
              console.error(error);
          }
      }
    fetchData();
  }, []);

  useEffect(() => {
    const owlCarousel = owlCarouselRef.current;
    if (data) {
        if (owlCarousel) {
            $(owlCarousel).owlCarousel({
                loop: true,
                items: 2.5,
                autoplay: true,
                autoplayTimeout: 5000,
                video: true,
                autoHeight: true,
                autoplaySpeed: 1000,
                stagePadding: 150, 
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
                }
            });
          }
    }
  }, [data]);

  if (!data) {
    return <p>Loading...</p>;
  }


  return (
    
      <div className="inner-box arrival-box mt-t-25">
          <div className='rail-header'>
              <h4>{data.railName}</h4>
              <a href='#'><span>See All</span><img src='./gluedin/arrow-small-left-g.svg'></img></a>
          </div>
          <OwlCarousel loop dots={false} items={2.5} autoplay={true} className="owl-carousel owl-theme trending-videos">
             {
                  data.itemList.map((videoInfo:any)=> (
                    
                      <div className="box text-center" style={{"width":"140px !important"}} key={videoInfo.id}>
                            <div className="img-box open-video-detail" id={videoInfo.id} 
                              style={{
                                  "background": `url("${videoInfo.thumbnail}") center`,
                                  "height": "100px !important",
                              }}>
                            
                            </div>
                        </div>
                  ))
            }
            
          </OwlCarousel>
      </div>
  );

} 


export default TrendingVideos;