
import React, { useEffect,useRef,useState } from 'react';
import gluedin from 'gluedin'
import { useParams, Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../../assets/css/custom.css';
import '../../../assets/css/responsive.css';
import './feed.css';

function ContentDetail(){
  var data :any
  var setData:any
  [data, setData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { contentId } = useParams();
  useEffect(() => {
      async function fetchData() {
          try {
            console.log("contentId ===", contentId)
            /*Initilize Feed Method*/
            var videoModuleObj:any = new gluedin.GluedInVideosModule();
            var limit = 10;
            var videoModuleResponse = await videoModuleObj.getVideoById(contentId);
            if (videoModuleResponse.status === 200) {
                let videoData = videoModuleResponse.data.result;
                console.log("Video Data ===", videoData.videoData);
                setData(videoData.videoData);
            }

          } catch (error) {
              console.error(error);
          }
      }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
        $(".post-slider-box").owlCarousel({
            loop: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000,
            video: true,
            autoHeight: false,
            autoplaySpeed: 1000,
            margin: 0,
            autoplayHoverPause: true,
            nav: false,
            dots: true,
            navText: [
              '<img src="./gluedin/svg">',
              '<img src="./gluedin/right-arrow.svg">',
            ],
        });
    }
  }, [data]);

  if (!data) {
    return <p>Loading...</p>;
  }

    const renderFirstContainer = (contentInfo: { contentType: string; contentUrls: any[]; }) => {
        return (
            <div className="post-box-parent col-md-7 first_div">
                <div className="post-slider-box-parent">
                    { contentInfo.contentType === "image" ? (
                        <div className="post-slider-box owl-carousel owl-theme">
                            {
                                contentInfo.contentUrls.map((_imageContent, _index)=> (
                                    <div key="{_index}" className="item"><img src={_imageContent.urls} className="full"/></div>
                                ))
                                
                            }
                        </div>
                    ): (
                        <div className="post-slider-box-02 video video-player" 
                            style={{
                            }}>
                            { renderVideoElement(contentInfo) }
                        </div>
                        
                    ) }
                    {renderBottomPost(contentInfo)}
                </div>
            </div>
        );
    }

    const renderSecondContainer = (contentInfo: { description?: any; user: { userId?: string | undefined; profileImageUrl?: string; fullName?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; followersCount?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; title?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
        let contentDescription = contentInfo?.description || "";            
        let showFollowButton = "block";
        let followingList:any = localStorage.getItem("following");
        if (
            followingList != undefined &&
            followingList != null &&
            followingList != "undefined"
        ) {
            followingList = JSON.parse(followingList);
            if (followingList.includes(contentInfo?.user?.userId)) {
            showFollowButton = "none";
            }
        }
        let profilePictureUrl = contentInfo?.user?.profileImageUrl || "assets/images/mini-pro.png";
        return (
            <div className="col-md-5 post-detail-box-parent second_div">
                <div className="post-detail-box">
                    <div className="top-details">
                        <ul>
                            <li className="img-li">
                                <div className="img-holder">
                                    <a href={'profile/' + contentInfo?.user?.userId}>
                                        <img src={profilePictureUrl} />
                                    </a>
                                </div>
                            </li>
                            <li>
                                <h3 className="ft-500">
                                    <a href={'profile/' + contentInfo?.user?.userId}>{contentInfo?.user?.fullName}</a>
                                    <p className="follow-c">{contentInfo?.user?.followersCount} followers</p>
                                </h3>
                            </li>
                            <li>
                                <button 
                                    className="follow-user" 
                                    id={contentInfo?.user?.userId} 
                                    style={{
                                        "display": `${showFollowButton}`
                                    }} 
                                >
                                    Follow +
                                </button>
                            </li>
                        </ul>
                        <div className="sml-text">{contentInfo?.title}</div>
                        <div className="c-text">{showMore ? contentDescription : `${contentDescription.substring(0, 100)}`} {renderDescription(contentDescription)}</div>
                    </div>
                <hr/>
                </div>
            </div>  
        );
    }

    const renderVideoElement = (contentInfo: { contentType?: string; contentUrls: any; socialType?: any; thumbnailUrl?: any; s3Url?: any; }) => {
        return (
            contentInfo.socialType && contentInfo.socialType.toLowerCase() === "youtube" ? (
                <>
                    <iframe id="youtubePlayer" src={contentInfo.contentUrls[0].urls[0]} width="200"></iframe>
                </>
            ): (
                <>
                    <video className="video_00" width="100%"  poster={contentInfo.thumbnailUrl}>
                        <source src={contentInfo.s3Url} type="video/mp4" />Your browser does not support the video tag.
                    </video>
                    <div className="player-controls">
                        <button className="play-button" title="Play"><i className="fa fa-play" aria-hidden="true"></i></button>
                        <a className="unmute-button" title="Mute"><i className="fa fa-volume-up" aria-hidden="true"></i></a>
                        <a className="mute-button" title="Unmute"><i className="fa fa-volume-off" aria-hidden="true"></i></a>
                    </div>
                </>
            )
        );
    }

    const renderDescription = (description: string | any[]) => {
        return (
            <>
                { description.length > 100 && (
                    <><a href="javascript:void(0)" className="text-b show-more-content" onClick={() => setShowMore(!showMore)}>{showMore ? "Show Less" : "Show More"}</a>
                    </>
                    )
                }
            </>
        )
    };

    const renderBottomPost = (contentInfoDetails: { contentType?: string; contentUrls?: any[]; hashtagTitles?: any; videoId?: any; likeCount?: any; shareCount?: any; description?: any; viewsCount?: any; }) => {
        let websiteUrl = encodeURI("./");
        var usedHashTagTitle = Array.isArray(
            contentInfoDetails.hashtagTitles
          )
            ? contentInfoDetails.hashtagTitles.join(",")
            : "";
        return (
            <>
                <div className="post-slider-box-bottom">
                    <div className="strip">
                        <ul className="post-slider-box-bottom-ul">

                            <li>
                                <a href="#" className="like-video" data-videoid={contentInfoDetails.videoId} onClick={handleLikeEvent}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.899 30.435"><path id="Heart" d="M129.908,216.734a8.443,8.443,0,0,0-6.28-2.734,7.9,7.9,0,0,0-4.934,1.7,10.08,10.08,0,0,0-1.995,2.083A10.091,10.091,0,0,0,114.7,215.7a7.9,7.9,0,0,0-4.933-1.7,8.444,8.444,0,0,0-6.281,2.734,9.814,9.814,0,0,0-2.491,6.7,11.687,11.687,0,0,0,3.114,7.65,66.4,66.4,0,0,0,7.8,7.317c1.08.92,2.3,1.964,3.576,3.076a1.843,1.843,0,0,0,2.427,0c1.271-1.111,2.5-2.156,3.577-3.077a66.366,66.366,0,0,0,7.8-7.316,11.686,11.686,0,0,0,3.114-7.65,9.814,9.814,0,0,0-2.491-6.7Zm0,0" transform="translate(-99.75 -212.75)" fill="none" stroke="#777" strokeWidth="2.5"/></svg>
                                    <span className="like-count"> { contentInfoDetails.likeCount }</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="social-share-options">
                                    <img src="../../gluedin/share-icon.svg" /><span className="share-count">{contentInfoDetails.shareCount }</span>
                                </a>
                                <ul className="social-share">
                                    <li>
                                        <a href={'https://www.facebook.com/sharer.php?u=' + websiteUrl} target="blank" rel="noopener noreferrer"><i className="fa fa-facebook"  ></i></a>
                                    </li>
                                    <li>
                                        <a href={`https://twitter.com/intent/tweet?url=${websiteUrl}&text=${contentInfoDetails.description}&hashtags=${usedHashTagTitle}&`} target="blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`} target="blank" rel="noopener noreferrer"><i className="fa fa-linkedin"  ></i></a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="views-video">
                                    <img src="../../gluedin/eye-view.svg" />
                                    <span className="views-count"> { contentInfoDetails.viewsCount }</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    };

    const handleLikeEvent = async (e:any) => {
        e.preventDefault();
        console.log(e.currentTarget.classList.contains('like-video'));
        const assetId = e.currentTarget.getAttribute("data-videoid");
        console.log("assetId===", assetId);
        return;
        var activityTimelineModuleObj = new gluedin.GluedInActivityTimeline();
        let userPostedComment = await activityTimelineModuleObj.activityTimelineLike({ assetId: assetId });
    }

    return (
        <>
            <Link to='/'>Back</Link>
            <div className="full-post-box ordering" key={data._id}>
                { data && (
                    <>
                        {renderFirstContainer(data)}
                        {renderSecondContainer(data)}
                    </>
                    )
                }
                
            </div>
        </>
    );

} 


export default ContentDetail;