import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import { showAlert } from '../../../Common/CommonAlert';
import Spinner from 'react-spinner-material';
import checkLogin from '../../../services/checkLogin'
import checkEdit from '../../../services/checkEditMode'
import "../Css/Login.css"
import "../../../css/main.css"
import "../../../css/react-confirm-alert.css";
import config from '../../../config'
import { basicAuth } from '../../../Common/Js/basicAuth'
import { setUsersList, setAuth } from '../../../reducer/action'


const Login = () => {
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [storeNo, setStoreNo] = useState('')
  const [passwords, setPasswords] = useState('')
  const history = useHistory()
  const [{ }, dispatch] = useGlobalState();




  const onChangeUserName = (e) => {
    setUserName(e.target.value)
  }
  const onChangeStoreNum = (e) => {
    setStoreNo(e.target.value)
  }

  const onChangePassword = (e) => {
    setPasswords(e.target.value)
  }

  const handleKeyPress = (target) => {
    if (target.charCode == 13) {
      document.getElementById("loginbtn").click()
    }
  }
  const loginValid = async () => {
    if (userName && passwords && storeNo) {
      config.userId = userName
      config.password = passwords
      config.storeId = storeNo
      var basicAuthVal = basicAuth(userName);
      config.basicAuthVal = 'Basic ' + basicAuthVal;
      setLoading(true)
      const checkLoginResponse = await checkLogin(userName, passwords, storeNo)
      setLoading(false)
      if (checkLoginResponse == 1001) {
        showAlert("Session Expire")
        dispatch(setAuth(false))
      } else {
        if (checkLoginResponse.errorCode == "00") {
          dispatch(setAuth(true));
          config.guid = checkLoginResponse.guid
          history.push('/EntryMode')
          // setLoading(true)
          // const checkEditMode  = await checkEdit()
          // setLoading(false)
          // if (checkEditMode == 1001) {
          //   showAlert("Session Expire")
          //   dispatch(setAuth(false))
          // }
          // else {
          //   if (checkEditMode.errorCode == "00") {
          //     dispatch(setAuth(true));
          // dispatch(setUsersList(checkEditMode.users))
          // }
          // else{
          //   showAlert(checkEditMode.errorMsg)
          
          // }
          // }
        }
        else {
          showAlert(checkLoginResponse.errorMsg)
        }
      }
    }
    else {
      showAlert("Please enter the required fields.")
    }
  }
  return (
    <div id="login-page" className="back-image" style={{ height: "100vh" }}>
      <div className="container" >
        <form className="form-login animate" action="index.html" autocomplete="off">
          <h2 className="form-login-heading">sign in now</h2>
          <div className="login-wrap ">
            <div className="spin">
              <Spinner visible={loading} spinnerColor={"rgba(0, 0, 0, 0.3)"} />
            </div>

            <label>User ID</label>
            <input type="text" input value={userName} id="userLogin" onChange={(e) => onChangeUserName(e)} className="form-control" placeholder="User ID" maxLength="10" autofocus="true" onKeyPress={(e) => handleKeyPress(e)}
              readonly onfocus="this.removeAttribute('readonly');" autoComplete="off" />
            <br />
            <label>Store ID</label>
            <input type="text" input value={storeNo} id="userLogin" onChange={(e) => onChangeStoreNum(e)} className="form-control" placeholder="Store ID" maxLength="10" autofocus="true" onKeyPress={(e) => handleKeyPress(e)}
              readonly onfocus="this.removeAttribute('readonly');" autoComplete="off" />
            <br />

            <label>Password</label>
            <input type="password" value={passwords} className="form-control" placeholder="Password" id="userPassword" maxLength="20" onChange={(e) => onChangePassword(e)} onKeyPress={(e) => handleKeyPress(e)}
              readonly
              onfocus="this.removeAttribute('readonly');" autoComplete="off" />
            <br />


            <div className="btns">
              <button
                type="button" className="btn btn-primary" id="loginbtn" style={{ width: "100%" }} onClick={(e) => loginValid(e)}
                disabled={loading}
              >Login</button>
            </div>


          </div>
        </form>
      </div>
    </div>
  )
}

export default Login