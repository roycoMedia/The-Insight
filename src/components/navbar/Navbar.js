import './navbar.css'
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase-config';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import pexelpassport from '../asset/pexelpassport.jpg'
import ReactTooltip from "react-tooltip";


const Navbar = ({setShow, profileDetails}) => {
  // FOR GETTING PROFILE INFOMATION
  const [profileInfo, setProfileInfo] = useState([])

  const [hasCreateProfile, setHasCreateProfile] = useState(false)

  // FOR OPEN AND CLOSE NAVBAR
  const [isOpen, setisOpen] = useState(false)

  // FROM AUTHCONTEXT
  const { user, logOut } = UserAuth()

  // FOR GETTING PROFILE CREATION STATUS
  const getInfo = localStorage.getItem("info")

  const navigate = useNavigate()

  // FOR FIRESTORE DATABASE
  const collectionRef = collection(db, 'profile')

  // FOR PROFILE MODAL FORM
  const handleShow = () => setShow(true);

  // FOR LOGGING OUT
  const handleSignOut = async () => {
    try {
      if(window.confirm('Are you sure you want to log out?')) {
        await logOut()
      }
    }
    catch(error) {
        console.log(error)
    }
  }

  // FOR GETTING PROFILE INFO
  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(collectionRef)
      // if(data) {
        setProfileInfo(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        // if(profileInfo.length < 0) {
        //   setHasCreateProfile(true)
        // }
      // }
      // profileDetails.length === 1 &&  profileDetails.map((item) => setEachProfileDetail({item}))

    }

    getNotes()
  },[]);
  
  // FOR REDIRECTING AFTER LOGOUT
  useEffect(() => {
    if(user === null) {
      navigate('/')
    }
  }, [user]);


  return (
    <div className='navbar'>
      <div className={`nav-items ${isOpen && 'open'}`}>
        <NavLink to='/about' className='smcLogo' >
          <svg 
            className='smcLogo' 
            id="logo-31" 
            width="104" 
            height="40" 
            viewBox="0 0 104 74" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"> 
            <path d="M8.47167 67.076V52H6V67.076H8.47167Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> 
            <path d="M9.98449 62.0507C9.98449 65.1307 12.051 67.3191 15.1912 67.3191C18.3314 67.3191 20.3979 65.1307 20.3979 62.0507C20.3979 58.9706 18.3314 56.7822 15.1912 56.7822C12.051 56.7822 9.98449 58.9706 9.98449 62.0507ZM12.4764 62.0507C12.4764 60.2472 13.5502 58.9909 15.1912 58.9909C16.8322 58.9909 17.906 60.2472 17.906 62.0507C17.906 63.8338 16.8322 65.1104 15.1912 65.1104C13.5502 65.1104 12.4764 63.8338 12.4764 62.0507Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> 
            <path d="M21.2292 61.848C21.2292 64.766 23.1133 66.8734 25.9294 66.8734C27.3881 66.8734 28.6442 66.2857 29.2722 65.3131V67.0152C29.2722 68.6565 28.239 69.7508 26.5169 69.7508C24.9772 69.7508 23.9237 69.001 23.7819 67.6839H21.29C21.6141 70.2979 23.6198 72 26.3751 72C29.6167 72 31.6831 69.8723 31.6831 66.5694V57.0659H29.4951L29.3533 58.4235C28.7455 57.3698 27.4894 56.7416 26.0104 56.7416C23.1538 56.7416 21.2292 58.9098 21.2292 61.848ZM23.7414 61.7872C23.7414 60.1256 24.7949 58.9098 26.3549 58.9098C28.0567 58.9098 29.1912 60.1459 29.1912 61.7872C29.1912 63.4488 28.0567 64.7254 26.3549 64.7254C24.8151 64.7254 23.7414 63.4691 23.7414 61.7872Z" 
            class="cneutral" 
            fill="#3d221e" 
            stop-color="#3d221e"></path> 
            <path d="M32.9063 62.0507C32.9063 65.1307 34.9728 67.3191 38.113 67.3191C41.2532 67.3191 43.3197 65.1307 43.3197 62.0507C43.3197 58.9706 41.2532 56.7822 38.113 56.7822C34.9728 56.7822 32.9063 58.9706 32.9063 62.0507ZM35.3982 62.0507C35.3982 60.2472 36.472 58.9909 38.113 58.9909C39.754 58.9909 40.8278 60.2472 40.8278 62.0507C40.8278 63.8338 39.754 65.1104 38.113 65.1104C36.472 65.1104 35.3982 63.8338 35.3982 62.0507Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> 
            <path d="M45.9946 55.0193C46.805 55.0193 47.4736 54.3708 47.4736 53.54C47.4736 52.7295 46.805 52.0811 45.9946 52.0811C45.164 52.0811 44.5359 52.7295 44.5359 53.54C44.5359 54.3708 45.164 55.0193 45.9946 55.0193ZM44.7588 67.076H47.2305V57.0659H44.7588V67.076Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M49.3959 71.7163H51.8067V65.6981C52.4348 66.7315 53.7922 67.3394 55.2914 67.3394C58.2493 67.3394 60.0119 65.0699 59.9713 61.9493C59.9106 58.8085 58.1075 56.7619 55.2711 56.7619C53.7517 56.7619 52.374 57.4306 51.7662 58.5856L51.6244 57.0659H49.3959V71.7163ZM51.908 62.0709C51.908 60.2675 53.0021 59.0111 54.7241 59.0111C56.4462 59.0111 57.4794 60.2877 57.4794 62.0709C57.4794 63.8541 56.4462 65.1104 54.7241 65.1104C53.0021 65.1104 51.908 63.8744 51.908 62.0709Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> 
            <path d="M60.5989 64.077C60.68 66.0628 62.2197 67.3394 64.6103 67.3394C66.9604 67.3394 68.5609 66.0831 68.5609 64.1378C68.5609 62.6991 67.6695 61.7264 66.0285 61.3212L64.2659 60.8956C63.5163 60.693 63.0098 60.4296 63.0098 59.7812C63.0098 59.0922 63.5568 58.6059 64.4482 58.6059C65.3802 58.6059 65.988 59.1327 65.988 60.0041H68.2368C68.1557 58.0182 66.6768 56.7619 64.509 56.7619C62.3615 56.7619 60.761 58.0182 60.761 59.923C60.761 61.2199 61.5106 62.2938 63.4353 62.8004L65.1776 63.2462C65.8259 63.4286 66.2311 63.7325 66.2311 64.2999C66.2311 65.0902 65.4815 65.4549 64.5698 65.4549C63.4758 65.4549 62.8477 64.9483 62.8477 64.077H60.5989Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M73.6877 67.3394C75.0451 67.3394 76.3417 66.7112 76.9292 65.7791L77.0913 67.076H79.4009V57.0659H76.9292V62.3141C76.9292 64.1175 76.2404 65.1307 74.6197 65.1307C73.3636 65.1307 72.4924 64.5228 72.4924 62.4559V57.0659H70.0207V63.3273C70.0207 65.7183 71.3173 67.3394 73.6877 67.3394Z" 
            class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> 
            <path d="M84.0541 67.076V61.3212C84.0541 59.7001 85.0063 58.9301 86.1814 58.9301C87.3564 58.9301 88.1263 59.6798 88.1263 61.0983V67.076H90.5372V61.3414C90.5372 59.7001 91.4691 58.9301 92.6442 58.9301C93.8395 58.9301 94.6094 59.6798 94.6094 61.0983V67.076H97V60.5309C97 58.2209 95.7236 56.7619 93.2925 56.7619C91.773 56.7619 90.5777 57.4914 90.0915 58.6667C89.5445 57.4914 88.4505 56.7619 86.7892 56.7619C85.6141 56.7619 84.5606 57.309 83.9731 58.2006L83.8515 57.0659H81.5825V67.076H84.0541Z" 
            class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M45.487 38.3523C42.2308 44.2121 35.6009 47 28.8971 47H2C30 43.5 49.5 29.5 52 10C54.5 29.5 74 43.5 102 47H75.1029C68.3991 47 61.7692 44.2121 58.513 38.3523C54.9886 32.01 52.7432 24.8334 52 17C51.2568 24.8334 49.0114 32.01 45.487 38.3523Z" class="ccustom" fill="#fa0000" stop-color="#fa0000"></path> <path d="M30.1051 36.2813C28.5344 37.1656 26.8822 37.9962 25.1522 38.7699C24.1695 35.3753 23.8079 31.8138 24.0963 28.266C24.4778 23.5725 25.9851 19.0476 28.4847 15.0923C30.9844 11.137 34.3991 7.87319 38.4265 5.59008C42.4539 3.30698 46.9697 2.07501 51.5738 2.00332C56.1779 1.93162 60.7282 3.02241 64.8217 5.17906C68.9152 7.3357 72.4255 10.4916 75.0416 14.3673C77.6578 18.243 79.2991 22.7188 79.8202 27.3982C80.2463 31.2257 79.9123 35.0929 78.8478 38.7699C77.1178 37.9962 75.4656 37.1655 73.8949 36.2812C74.5571 33.593 74.7427 30.7964 74.4342 28.0256C74.014 24.2521 72.6904 20.6428 70.5808 17.5175C68.4711 14.3922 65.6404 11.8472 62.3394 10.1081C59.0384 8.36897 55.369 7.48937 51.6563 7.54718C47.9435 7.60499 44.302 8.59845 41.0544 10.4395C37.8067 12.2806 35.053 14.9125 33.0373 18.1021C31.0216 21.2917 29.8061 24.9405 29.4985 28.7254C29.2917 31.2694 29.4993 33.8222 30.1051 36.2813Z" class="ccompli1" fill="#659447" stop-color="#659447"></path> 
          </svg>
        </NavLink>
        
        <ul>
          <NavLink className='nav-logo' to='/about'>
            <svg id="logo-31" width="104" height="40" viewBox="0 0 104 74" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.47167 67.076V52H6V67.076H8.47167Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M9.98449 62.0507C9.98449 65.1307 12.051 67.3191 15.1912 67.3191C18.3314 67.3191 20.3979 65.1307 20.3979 62.0507C20.3979 58.9706 18.3314 56.7822 15.1912 56.7822C12.051 56.7822 9.98449 58.9706 9.98449 62.0507ZM12.4764 62.0507C12.4764 60.2472 13.5502 58.9909 15.1912 58.9909C16.8322 58.9909 17.906 60.2472 17.906 62.0507C17.906 63.8338 16.8322 65.1104 15.1912 65.1104C13.5502 65.1104 12.4764 63.8338 12.4764 62.0507Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M21.2292 61.848C21.2292 64.766 23.1133 66.8734 25.9294 66.8734C27.3881 66.8734 28.6442 66.2857 29.2722 65.3131V67.0152C29.2722 68.6565 28.239 69.7508 26.5169 69.7508C24.9772 69.7508 23.9237 69.001 23.7819 67.6839H21.29C21.6141 70.2979 23.6198 72 26.3751 72C29.6167 72 31.6831 69.8723 31.6831 66.5694V57.0659H29.4951L29.3533 58.4235C28.7455 57.3698 27.4894 56.7416 26.0104 56.7416C23.1538 56.7416 21.2292 58.9098 21.2292 61.848ZM23.7414 61.7872C23.7414 60.1256 24.7949 58.9098 26.3549 58.9098C28.0567 58.9098 29.1912 60.1459 29.1912 61.7872C29.1912 63.4488 28.0567 64.7254 26.3549 64.7254C24.8151 64.7254 23.7414 63.4691 23.7414 61.7872Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M32.9063 62.0507C32.9063 65.1307 34.9728 67.3191 38.113 67.3191C41.2532 67.3191 43.3197 65.1307 43.3197 62.0507C43.3197 58.9706 41.2532 56.7822 38.113 56.7822C34.9728 56.7822 32.9063 58.9706 32.9063 62.0507ZM35.3982 62.0507C35.3982 60.2472 36.472 58.9909 38.113 58.9909C39.754 58.9909 40.8278 60.2472 40.8278 62.0507C40.8278 63.8338 39.754 65.1104 38.113 65.1104C36.472 65.1104 35.3982 63.8338 35.3982 62.0507Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M45.9946 55.0193C46.805 55.0193 47.4736 54.3708 47.4736 53.54C47.4736 52.7295 46.805 52.0811 45.9946 52.0811C45.164 52.0811 44.5359 52.7295 44.5359 53.54C44.5359 54.3708 45.164 55.0193 45.9946 55.0193ZM44.7588 67.076H47.2305V57.0659H44.7588V67.076Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M49.3959 71.7163H51.8067V65.6981C52.4348 66.7315 53.7922 67.3394 55.2914 67.3394C58.2493 67.3394 60.0119 65.0699 59.9713 61.9493C59.9106 58.8085 58.1075 56.7619 55.2711 56.7619C53.7517 56.7619 52.374 57.4306 51.7662 58.5856L51.6244 57.0659H49.3959V71.7163ZM51.908 62.0709C51.908 60.2675 53.0021 59.0111 54.7241 59.0111C56.4462 59.0111 57.4794 60.2877 57.4794 62.0709C57.4794 63.8541 56.4462 65.1104 54.7241 65.1104C53.0021 65.1104 51.908 63.8744 51.908 62.0709Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M60.5989 64.077C60.68 66.0628 62.2197 67.3394 64.6103 67.3394C66.9604 67.3394 68.5609 66.0831 68.5609 64.1378C68.5609 62.6991 67.6695 61.7264 66.0285 61.3212L64.2659 60.8956C63.5163 60.693 63.0098 60.4296 63.0098 59.7812C63.0098 59.0922 63.5568 58.6059 64.4482 58.6059C65.3802 58.6059 65.988 59.1327 65.988 60.0041H68.2368C68.1557 58.0182 66.6768 56.7619 64.509 56.7619C62.3615 56.7619 60.761 58.0182 60.761 59.923C60.761 61.2199 61.5106 62.2938 63.4353 62.8004L65.1776 63.2462C65.8259 63.4286 66.2311 63.7325 66.2311 64.2999C66.2311 65.0902 65.4815 65.4549 64.5698 65.4549C63.4758 65.4549 62.8477 64.9483 62.8477 64.077H60.5989Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M73.6877 67.3394C75.0451 67.3394 76.3417 66.7112 76.9292 65.7791L77.0913 67.076H79.4009V57.0659H76.9292V62.3141C76.9292 64.1175 76.2404 65.1307 74.6197 65.1307C73.3636 65.1307 72.4924 64.5228 72.4924 62.4559V57.0659H70.0207V63.3273C70.0207 65.7183 71.3173 67.3394 73.6877 67.3394Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M84.0541 67.076V61.3212C84.0541 59.7001 85.0063 58.9301 86.1814 58.9301C87.3564 58.9301 88.1263 59.6798 88.1263 61.0983V67.076H90.5372V61.3414C90.5372 59.7001 91.4691 58.9301 92.6442 58.9301C93.8395 58.9301 94.6094 59.6798 94.6094 61.0983V67.076H97V60.5309C97 58.2209 95.7236 56.7619 93.2925 56.7619C91.773 56.7619 90.5777 57.4914 90.0915 58.6667C89.5445 57.4914 88.4505 56.7619 86.7892 56.7619C85.6141 56.7619 84.5606 57.309 83.9731 58.2006L83.8515 57.0659H81.5825V67.076H84.0541Z" class="cneutral" fill="#3d221e" stop-color="#3d221e"></path> <path d="M45.487 38.3523C42.2308 44.2121 35.6009 47 28.8971 47H2C30 43.5 49.5 29.5 52 10C54.5 29.5 74 43.5 102 47H75.1029C68.3991 47 61.7692 44.2121 58.513 38.3523C54.9886 32.01 52.7432 24.8334 52 17C51.2568 24.8334 49.0114 32.01 45.487 38.3523Z" class="ccustom" fill="#fa0000" stop-color="#fa0000"></path> <path d="M30.1051 36.2813C28.5344 37.1656 26.8822 37.9962 25.1522 38.7699C24.1695 35.3753 23.8079 31.8138 24.0963 28.266C24.4778 23.5725 25.9851 19.0476 28.4847 15.0923C30.9844 11.137 34.3991 7.87319 38.4265 5.59008C42.4539 3.30698 46.9697 2.07501 51.5738 2.00332C56.1779 1.93162 60.7282 3.02241 64.8217 5.17906C68.9152 7.3357 72.4255 10.4916 75.0416 14.3673C77.6578 18.243 79.2991 22.7188 79.8202 27.3982C80.2463 31.2257 79.9123 35.0929 78.8478 38.7699C77.1178 37.9962 75.4656 37.1655 73.8949 36.2812C74.5571 33.593 74.7427 30.7964 74.4342 28.0256C74.014 24.2521 72.6904 20.6428 70.5808 17.5175C68.4711 14.3922 65.6404 11.8472 62.3394 10.1081C59.0384 8.36897 55.369 7.48937 51.6563 7.54718C47.9435 7.60499 44.302 8.59845 41.0544 10.4395C37.8067 12.2806 35.053 14.9125 33.0373 18.1021C31.0216 21.2917 29.8061 24.9405 29.4985 28.7254C29.2917 31.2694 29.4993 33.8222 30.1051 36.2813Z" class="ccompli1" fill="#659447" stop-color="#659447"></path> </svg>
          </NavLink>
          <li ><NavLink className='link' to='/' onClick={() => setisOpen(!isOpen)}> <i className="fa fa-home resIcon" aria-hidden="true" style={navItemStyle}></i> Home </NavLink></li>
          <li ><NavLink className='link' to='/about' onClick={() => setisOpen(!isOpen)}> <i className="fa fa-info-circle resIcon" aria-hidden="true" style={navItemStyle}></i> About </NavLink></li>
          <li ><NavLink className='link' to='/contact' onClick={() => setisOpen(!isOpen)}> <i className="fa fa-phone-square resIcon" aria-hidden="true" style={navItemStyle}></i> Contact </NavLink></li>
          <li ><NavLink className='link' to='/addBlog' onClick={() => setisOpen(!isOpen)}> <i className="fa fa-pencil-square resIcon" aria-hidden="true" style={navItemStyle}></i> Write </NavLink></li>
          

          <div className='text'>
            <ul>
              <li ><NavLink className='link' to='#' onClick={() => setisOpen(!isOpen)}> Help </NavLink></li>
              <li ><NavLink className='link' to='/Profile' onClick={() => setisOpen(!isOpen)}> Profile </NavLink></li>
              <li onClick={handleShow}><NavLink className='link' to='/ProfileForm' onClick={() => setisOpen(!isOpen)}> Start </NavLink></li>
            </ul>
            <ul>
            {/* {console.log(profileDetails)} */}
            {console.log(profileInfo)}
                { user ?
                    <li onClick={handleSignOut} ><NavLink className='link' to='/' onClick={() => setisOpen(!isOpen)}> Log Out </NavLink></li> :
                  <>
                    <li ><NavLink className='link' to='/login' onClick={() => setisOpen(!isOpen)}> Login </NavLink></li>
                    <li ><NavLink className='link' to='/register' onClick={() => setisOpen(!isOpen)}> Register </NavLink></li>
                  </>
                }
            </ul>
          </div>

        </ul>
          
      </div>

      <div className='nav-second-items'>
        {
          user ? 
          (
            <ul>
              <li onClick={handleShow}>
                <NavLink className='link' to='/ProfileForm'> <i class="fa-regular fa-lightbulb" style={{fontSize: '1.3rem'}} data-tip data-for="start"></i> </NavLink>
                <ReactTooltip id="start" place="top" effect="solid">
                  Getting Started
                </ReactTooltip>
              </li>
              
              <li >
                <NavLink className='link' to='/'> <i class="fa-solid fa-file-invoice" style={{fontSize: '1.3rem'}} data-tip data-for="new"></i> </NavLink>
                <ReactTooltip id="new" place="top" effect="solid">
                  What's New
                </ReactTooltip>
              </li>

              <li >
                <NavLink className='link' to='/' onClick={handleSignOut}> <i class="fa-solid fa-circle-question" style={{fontSize: '1.3rem'}} data-tip data-for="help"></i> </NavLink>
                <ReactTooltip id="help" place="top" effect="solid">
                  Log Out
                </ReactTooltip>
              </li>

              <li>
                <NavLink to='/Profile' ><img className='tpImg' src={pexelpassport} alt="profile" style={{marginTop: '-8px', width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}} data-tip data-for="profile" /></NavLink>
                <ReactTooltip id="profile" place="top" effect="solid">
                  Profile
                </ReactTooltip>
              </li>

            </ul>
          ): 
          (
            <ul>
              <li ><NavLink className='link' to='/login' onClick={() => setisOpen(!isOpen)}> <i class="fa-solid fa-paper-plane" style={{fontSize: '1em', color: 'rgb(81,163,255)'}}></i> Login </NavLink></li>
              <li ><NavLink className='link' to='/register' onClick={() => setisOpen(!isOpen)}> <i class="fa-regular fa-address-card" style={{fontSize: '1em', color: 'rgb(81,163,255)'}}></i>  Register </NavLink></li>
            </ul>
          )
        }
      </div>

            

      <div className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={() => setisOpen(!isOpen)}>
        <div className="bar"></div>
      </div>
    </div>
  );
}

const navItemStyle = {
  fontSize: '1.2em', 
  color: 'rgb(81,163,255)'
}

export default Navbar;
