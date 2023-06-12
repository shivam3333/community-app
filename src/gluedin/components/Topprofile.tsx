import React, { useEffect,useRef,useState } from 'react';
import gluedin from 'gluedin'
import 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../assets/css/custom.css';
import '../../assets/css/responsive.css'
import './Topprofile.css'

function TopProfile(){
  var data:any;
  var setData:any;  
  [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userModuleObj = new gluedin.GluedInUserModule();
        const userModuleResponse = await userModuleObj.getTopProfiles({});
        setData(userModuleResponse.data.result);
      
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    if (data) {
      $(".top-profile-list").owlCarousel({
        loop: true,
        items: 4,
        autoplay: true,
        autoplayTimeout: 2000,
        video: true,
        autoplaySpeed: 1000,
        margin: 10,
        autoplayHoverPause: true,
        nav: false,
        dots: false,
        navText: ["prev", "next"],
      });
    }
  }, [data]);

  if (!data) {
    return <p>Loading...</p>;
  }


  return (
    <div className="box top-profile-box">
      <div className="col-md-7 top-profile-box-left-sec">
        <div className='rail-header'>
            <h4>Top Biryani Outlets</h4>
            <a href='#'><span>See All</span><img src='./gluedin/arrow-small-left-g.svg'></img></a>
        </div>
        <div className="list list-inline profile-box-slider owl-carousel owl-theme top-profile-list">
          {
            data.map((item:any) => (
              <div key={item.userId} className="item"><a href={'profile/' + item.userId}>
                <img src={item.profileImageUrl} /><span className="sml-text name">{item.fullName.length > 10
                ? item.fullName.substr(0, 10) + ".."
                : item.fullName}
              </span>
              <span className="followers">{item.followersCount} Followers</span></a></div>
            ))
          }
        </div>
      </div>
    </div>
  );

} 


export default TopProfile;