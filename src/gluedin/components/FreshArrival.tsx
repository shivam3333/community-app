
import React, { useEffect,useState } from 'react';
import gluedin from "gluedin";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../assets/css/custom.css';
import '../../assets/css/responsive.css'
import Carousel from './shared/Carousel';

function FreshArrival(){
  
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
                  let freshArrivalVideos = curatedContentModuleResponse.data.result.find((rail:any)=> rail.railId === "railId_4");
                  
                  setData(freshArrivalVideos);
              }

          } catch (error) {
              console.error(error);
          }
      }
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }


  return (
    
      <div className="inner-box arrival-box mt-t-45">
          <div className="rail-header">
            <h4>{data.railName}</h4>
            <a href="#"><span>See All</span>
              <img src="./gluedin/arrow-small-left-g.svg" />
            </a></div>
          <Carousel images={data.itemList}/>
      </div>
  );

} 


export default FreshArrival;