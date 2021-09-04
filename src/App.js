import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import PostPage from './components/pages/PostPage';
import UserPage from './components/pages/UserPage';
import CommentPage from './components/pages/CommentPage';

import RegisterForm from './components/pages/RegistrationForm';
import LoginForm from './components/pages/LoginForm';
import ForgotForm from './components/pages/ForgotForm';

import Bookmarks from './components/pages/Bookmarks';
import HotPage from './components/pages/Hot';
import SubscriptionsPage from './components/pages/Subscriptions';

function App() {
  axios.defaults.baseURL = 'https://fierce-dusk-92502.herokuapp.com';
  axios.interceptors.request.use(
        config => {
          console.log(config)
            return config;
        },
        error => {
            Promise.reject(error)
        });

  axios.interceptors.response.use((response) => {
      console.log(response)
      return response
    }, error => {
      console.log(error)
      const originalRequest = error.config;
      if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
          originalRequest._retry = true;
          return axios.post('/token/refresh/',
            {
              'refresh' : window.localStorage.getItem('refresh')
            })
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                  window.localStorage.setItem('access', JSON.parse(res.request.response).access)
                  originalRequest.headers.Authorization = 'Bearer ' + JSON.parse(res.request.response).access
                  return axios(originalRequest);
              }
            })
      }
    return Promise.reject(error);
  })
  return (
      <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/registration" component={RegisterForm}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/forgot" component={ForgotForm}/>
            <Route exact path="/user/:username" component={UserPage}/>
            <Route exact path="/post/:post_id" component={PostPage}/>
            <Route exact path="/settings" component={Settings}/>
            <Route exact path="/bookmarks" component={Bookmarks}/>
            <Route exact path="/comment/:comment_id" component={CommentPage}/>
            <Route exact path="/hot" component={HotPage}/>
            <Route exact path="/subscriptions" component={SubscriptionsPage}/>
          </Switch>
      </Router>
  );
}



export default App;
