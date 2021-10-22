import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../../Context';
import "../Css/Logout.css"
import "../../../css/main.css"
import { confirmAlert } from "react-confirm-alert";
import "../../../css/react-confirm-alert.css";
import checkLogout from '../../../services/checkLogout'
import { showAlert } from '../../../Common/CommonAlert';
import { setEditDetils, setAuth } from '../../../reducer/action'
import config from '../../../config'


const Logout = (props) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [{ userDetails }, dispatch] = useGlobalState();


  const logout = () => {
    confirmAlert({
      message: "Are you sure you want to  logout?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            callLogout()
          }
        },

        {
          label: 'No',
          onClick: () => { return false }
        },

      ]
    })


  }
  const callLogout = async () => {
    setLoading(true)
    const checkLogoutResponse = await checkLogout()
    setLoading(false)
    if (checkLogoutResponse == 1001) {
      showAlert("Session Expire")
      dispatch(setAuth(false))
    } else {
      if (checkLogoutResponse.errorCode == "00") {
        localStorage.clear();
        dispatch(setAuth(false));
        dispatch(setEditDetils(''))
        history.replace('/')
      }
      else {
        showAlert(checkLogoutResponse.errorMsg)
      }
    }
  }

  const editMode = (e) => {
    history.push('/CustomerDetails')
  }
  const entryMode = (e) => {
    history.push('/EntryMode')
  }

  return (
    <div>
      <header className="header black-bg " >
        {/* <div class="maxwidth"> */}
        <a className="logo"> <img src={require("../../../Img/logo.png")} />
        </a>
        {/* </div> */}




        <ul className="nav pull-right pos-rel">
          <a data-toggle="dropdown" style={{ "margin-right": "15px", "margin-top": "10px" }} onClick={(e) => entryMode(e)}>{props.props == "Entry" ? <h5 style={{ color: "red" }}>Entry Mode</h5> : <h5>Entry Mode</h5>}</a>
          {/* <a data-toggle="dropdown" style={{ "margin-right": "15px", "margin-top": "10px" }} onClick={(e) => editMode(e)}>{props.props == "Edit" ? <h5 style={{ color: "red" }}>Edit  Mode</h5> : <h5>Edit  Mode</h5>}</a> */}
          <a data-toggle="dropdown" style={{ "margin-right": "15px", "margin-top": "10px" }} onClick={() => logout()}> <h5><i class="fa fa-power-off"></i></h5>
          </a>


        </ul>
      </header>



    </div>
  )

}


export default Logout