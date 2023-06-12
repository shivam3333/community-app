import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import gluedin from 'gluedin'
import '../../../assets/css/custom.css';
import '../../../assets/css/responsive.css'
import './Profile.css'

function Profile({}) {
  let userDetail: any;
  let setUserDetail: any;
  [userDetail, setUserDetail] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
      async function fetchData(userId:any) {
          try {
            
              let userModuleObj = new gluedin.GluedInUserModule();
              let userModuleResponse = await userModuleObj.getUserDetails(userId);
              if (userModuleResponse.status === 200) {
                  let userInfo = userModuleResponse.data.result;
                  console.log(userInfo);
                  setUserDetail(userInfo);
              }

          } catch (error) {
              console.error(error);
          }
      }
    fetchData(userId);
  }, [userId]);

  useEffect(() => {
      async function fetchVideos() {
          try {
            
              let userModuleObj = new gluedin.GluedInUserModule();
              var userVideoModuleResponse = await userModuleObj.getUserVideoList({
                  userId: userId,
                });
              if (userVideoModuleResponse.status === 200) {
                  let videoList = userVideoModuleResponse.data.result;
                  console.log(videoList);
                  setUserVideos(videoList);
              }

          } catch (error) {
              console.error(error);
          }
      }
      fetchVideos();
  }, [userId]);

  if (!userVideos && !userDetail) {
      return <p>Loading...</p>;
  }


  return (

      <div className="full-box profile-full-box">
          <div className="profile-page-head">
              <ul className="profile-page-head-ul list-none">
                  <li className="profile-page-head-avatar">
                      <div className="img-sec">
                          <img
                              src={userDetail?.profileImageUrl}
                              id="profileImage"
                              alt="profile-image"
                              className="bg-img-02 profileImage"
                          />
                      </div>
                      <div className="profile-follow">
                          <button className="follow-profile">Follow</button>
                      </div>
                  </li>

                  <li className="profile-page-head-content">
                      <ul className="profile-page-head-content-inner">
                          <li>
                              <h4 id="displayName">{userDetail?.fullName}</h4>
                              <h5 id="userId">{userDetail?.userName}</h5>
                          </li>

                          <li>
                              <h5>Followers</h5>
                              <span id="followerCount">{userDetail?.followersCount}</span>
                          </li>

                          <li>
                              <h5>Following</h5>
                              <span id="followingCount">{userDetail?.followingCount}</span>
                          </li>

                          <li>
                              <h5>Posts</h5>
                              <span id="videoCount">{userDetail?.videoCount}</span>
                          </li>
                      </ul>

                  </li>
              </ul>

          </div>

          <div className="inner-box arrival-box profile-videos">
              <div id="tabs-content">
                  <div className="row tab-content userVideoData" id="tab1">
                      {
                          userVideos.map((video:any) => {

                              let thumbnailUrls = video.thumbnailUrls
                                  ? video.thumbnailUrls[0]
                                  : video.thumbnailUrl;
                              return (
                                  <div className="col-md-3 col-sm-3 col-xs-6 box text-center" key={video.videoId}>
                                      <div className="img-box open-video-detail" id={video.videoId}
                                          style={{
                                              "background": `url(${thumbnailUrls}) center`,
                                              "height": "227px",
                                          }}>
                                      </div>
                                  </div>

                              )
                          })
                      }
                  </div>
              </div>
          </div>
      </div>
  );


}


export default Profile;
