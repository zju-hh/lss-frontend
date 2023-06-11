import React  from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import PersonItem from "./components/Login/PersonItem";
import 'semantic-ui-css/semantic.css';
import Profile from "./components/Login/Profile";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home"
import LoginPage from "./components/Login/LoginPage";
import Register from "./components/Register/Register";
import agent from "./agent";
import ChangePassword from "./components/Register/ChangePassword";
import ReleaseSale from "./components/Release/ReleaseSale";
import ChangeSale from "./components/Release/ChangeSale";
import ReleaseWanted from "./components/Release/ReleaseWanted";
import ChangeWanted from "./components/Release/ChangeWanted";
import Details from "./components/Details/Details";
import HeaderToolWrapper from "./components/Header/HeaderToolWrapper";
import SearchSite from "./components/main/SearchSite";
import Sort1 from "./components/sort/Sort";

//withAuth的组件实例化
const AuthProfile = withAuth(Profile)
const AuthPersonItem = withAuth(PersonItem)
const AuthChangePW = withAuth(ChangePassword)
const AuthReleaseSale = withAuth(ReleaseSale)
const AuthChangeSale = withAuth(ChangeSale)
const AuthReleaseWanted = withAuth(ReleaseWanted)
const AuthChangeWanted = withAuth(ChangeWanted)

//检查是否登录
function checkAuth() {
	const token = localStorage.getItem('token');
	console.log("CheckToken:"+token)
	return !!token;
  }

  function withAuth(Component) {
	function AuthenticatedRoute(props) {
	  if (!checkAuth()) {
		alert("未登录")
		return <Navigate to="/Login" />;
	  }
	   return <Component {...props} />;
	};
	return AuthenticatedRoute;
  }

function App() {
	const [token, setToken] = React.useState('');
  return (

      <Router >
              <HeaderToolWrapper/>
              	<Routes>
                		<Route exact path="/"  element={<Home/>} />
      				<Route exact path="/Home"  element={<Home/>} />
      				<Route path="/search" element={<SearchSite/>} />
      				<Route path="/0/search" element={<SearchSite/>} />
      				<Route path="/1/search" element={<SearchSite/>} />
      				<Route path="/2/search" element={<SearchSite/>} />
      				<Route path="/3/search" element={<SearchSite/>} />
      				<Route path="/4/search" element={<SearchSite/>} />
      				<Route path="/5/search" element={<SearchSite/>} />
      				<Route path="/6/search" element={<SearchSite/>} />
      				<Route path="/7/search" element={<SearchSite/>} />
      				<Route path="/8/search" element={<SearchSite/>} />
      				<Route path="/9/search" element={<SearchSite/>} />
      				<Route path="/10/search" element={<SearchSite/>} />
      				<Route path="/11/search" element={<SearchSite/>} />
      				<Route path="/12/search" element={<SearchSite/>} />
      				<Route path="/13/search" element={<SearchSite/>} />
      				<Route path="/14/search" element={<SearchSite/>} />
      				<Route path="/0" element={<Sort1/>} />
      				<Route path="/1" element={<Sort1/>} />
      				<Route path="/2" element={<Sort1/>} />
      				<Route path="/3" element={<Sort1/>} />
      				<Route path="/4" element={<Sort1/>} />
      				<Route path="/5" element={<Sort1/>} />
      				<Route path="/6" element={<Sort1/>} />
      				<Route path="/7" element={<Sort1/>} />
      				<Route path="/8" element={<Sort1/>} />
      				<Route path="/9" element={<Sort1/>} />
      				<Route path="/10" element={<Sort1/>} />
      				<Route path="/11" element={<Sort1/>} />
      				<Route path="/12" element={<Sort1/>} />
      				<Route path="/13" element={<Sort1/>} />
      				<Route path="/14" element={<Sort1/>} />
      				<Route path="/Login" element={<LoginPage/>} />
      				<Route path="/Register" element={<Register/>} />
      				<Route path="/Details" element={<Details/>} />
			{/* 需要身份验证的部分 */}
			<Route path="/Profile"  element={<AuthProfile />} />
            		<Route path="/PersonItem"  element={<AuthPersonItem/>} />
			<Route path="/ChangePassword" element = {<AuthChangePW/>} />
			<Route path="/ReleaseWanted" element={<AuthReleaseWanted />} />
			<Route path="/ChangeSale" element={<AuthChangeSale />} />
			<Route path="/ChangeWanted" element={<AuthChangeWanted />} />
			<Route path="/ReleaseSale" element = {<AuthReleaseSale/>}/>
        </Routes>
      </Router>
  );
}

export default App;
