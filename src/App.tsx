import React from 'react';
import logo from './logo.svg';
import './App.css';
import Discover from './gluedin/components/Discover';
import Home from './gluedin/components/Home';
import Profile from './gluedin/components/Profile/Profile';
import ContentDetail from './gluedin/components/Feed/ContentDetail';
import gluedin from 'gluedin'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link  } from 'react-router-dom';


function App() {
  let gluedInSDKInitilize = new gluedin.GluedInSDKInitilize();
  gluedInSDKInitilize.initialize({
    apiKey: "b0d9a77e-a27d-4c65-bff9-35f1eb5add2d",
    secretKey: "d9e92ea2-fbe9-4e92-b55b-41cee6f0c10e",
  });
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/content/:contentId" element={<ContentDetail />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
