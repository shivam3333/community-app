import '../../assets/css/custom.css';
import '../../assets/css/responsive.css'
import TopProfile from './Topprofile';
import FeedData from './Feed/feed';
function Home() {
    
    return(
        <div>
            <TopProfile />
            <FeedData />
        </div>
    );


}



export default Home;