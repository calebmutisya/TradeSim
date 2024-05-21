import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import './css/App.css';
import Layout from './layouts/Layout.js'
import Home from './pages/Home.js'
import Markets from './pages/Markets.js'
import News from './pages/News.js'
import Analysis from './pages/Analysis.js'
import Guide from './pages/Guide.js'
import Article from './pages/Article.js'
import Profile from './pages/Profile.js'
import ResetPassword from './pages/ResetPassword.js';
import UserProvider from './context/UserContext.js';
import OpentradeProvider from './context/OpentradeContext.js';


function App() {
  return (
      <Router>
        <UserProvider>
          <OpentradeProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home/>}/>
                <Route path="/markets" element={<Markets/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/analysis" element={<Analysis/>}/>
                <Route path="/guide" element={<Guide/>}/>
                <Route path="/article" element={<Article/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/resetpassword" element={<ResetPassword/>}/>
              </Route>
            </Routes>
          </OpentradeProvider>
        </UserProvider>
      </Router>
  );
}

export default App;
