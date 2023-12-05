import React from "react";
import "./topbar.css";
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/apiCalls'
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault()
    logOut(dispatch)
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="link">
            <span className="logo">Магазин книг</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHylImJYzj9lk7lolyKthJ0lAGG4iDlFnInCMNZvKoQ&s" alt="" className="topAvatar" />
          <div onClick={handleClick} className="logout"><ExitToApp /></div>
        </div>
      </div>
    </div>
  );
}
