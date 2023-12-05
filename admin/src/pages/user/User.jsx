import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Publish,
  AccountBox,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { updateUsers } from "../../redux/apiCalls";

export default function User() {
  const location = useLocation()
  const dispatch = useDispatch();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId))
  const [input, setInput] = useState({ ...user })

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpdate = (e) => {
    const newuser = { ...input };
    updateUsers(userId, newuser, dispatch)
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Редагувати</h1>
        <Link to="/newUser">
          <button className="userAddButton">Створити</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHylImJYzj9lk7lolyKthJ0lAGG4iDlFnInCMNZvKoQ&s"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">

              <span className="userShowUsername">ID: {user._id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Деталі користувача</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Нікнейм: </span>
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <AccountBox className="userShowIcon" />
              <span className="userShowInfoTitle">Повне ім'я: </span>
              <span className="userShowInfoTitle">{user.firstname} {user.lastname}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Адмін: </span>
              <span className="userShowInfoTitle">{user.isAdmin.toString()}</span>
            </div>
            <span className="userShowTitle">Контакти</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Редагувати</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Нікнейм</label>
                <input
                  name="username"
                  type="text"
                  placeholder="ira123"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Ім'я</label>
                <input
                  name="fistname"
                  type="text"
                  placeholder="Iryna"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Прізвище</label>
                <input
                  name="lastname"
                  type="text"
                  placeholder="Perkhun"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Електронна пошта</label>
                <input
                  name="email"
                  type="text"
                  placeholder="ira123@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
              <label>Адмін</label>
                <select name="isAdmin" id="isAdmin" onChange={handleChange}>
                  <option defaultValue={user.isAdmin}>Вибрати</option>
                  <option value="true">Так</option>
                  <option value="false">Ні</option>
                </select>
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>Оновити</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}