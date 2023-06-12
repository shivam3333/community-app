import '../../assets/css/custom.css';
import '../../assets/css/responsive.css'
import FreshArrival from './FreshArrival';
import TopProfile from './Topprofile';
import TrendingVideos from './TrendingVideos';
function Discover() {
    
    return(
        <div>
            <FreshArrival />
            <TopProfile />
            <TrendingVideos />
        </div>
    );


}



export default Discover;