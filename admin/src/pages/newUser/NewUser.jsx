import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux/apiCalls";
import "./newUser.css";
import { nanoid } from "nanoid";

export default function NewUser() {
  const [inputs, setInputs] = useState([{ uniid: nanoid(), isAdmin: false }])
  const [Id, setId] = useState(
    (inputs[0] && inputs[0].uniid) || ""
  )
  const dispatch = useDispatch()

  /*   const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    }
  
    const handleClick = (e) => {
      e.preventDefault()
      const user = { ...inputs }
      addUsers(user, dispatch)
    } */

  const handleClick = (e) => {
    e.preventDefault()
    addUsers(inputs, dispatch)
  }

  function createNew(e) {
    e.preventDefault()
    const newInputs = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      isAdmin: false,
      uniid: nanoid()
    }
    setInputs(prevInputs => [newInputs, ...prevInputs])
    setId(newInputs.uniid)
  }

  const handleChange = (e) => {
    setInputs((prev) => prev.map(item => {
      return item.uniid === Id ?
        { ...item, [e.target.name]: e.target.value } :
        item
    }));
  };

  function deleteUser(uniid) {
    setInputs(prev => prev.filter(item => item.uniid !== uniid))
  }

  console.log(inputs)
  return (
    /* <div className="newUser">
      <h1 className="newUserTitle">Новий користувач</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Ім'я</label>
          <input name="firstname" type="text" placeholder="John" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Прізвище</label>
          <input name="lastname" type="text" placeholder="Smith" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Нікнейм</label>
          <input name="username" type="text" placeholder="john123" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Електронна пошта</label>
          <input name="email" type="email" placeholder="john@gmail.com" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Пароль</label>
          <input name="password" type="password" placeholder="password" onChange={handleChange} />
        </div>
        <button onClick={handleClick} className="newUserButton">Створити</button>
      </form>
    </div> */
    <div className="newUser">
      <div className="newUserWrapper">
        <h1 className="newUserTitle">Новий користувач</h1>
        <button className="addNewuser" onClick={createNew}>+</button>
      </div>
      <div className="fromWrraper">
        {inputs?.map(item =>
          <div className="userCard" onClick={() => setId(item.uniid)}>
            <form className="newUserForm">
              <div className="newUserItem">
                <label>Ім'я</label>
                <input name="firstname" type="text" placeholder="John" value={item.firstname} onChange={handleChange} />
              </div>
              <div className="newUserItem">
                <label>Прізвище</label>
                <input name="lastname" type="text" placeholder="Smith" value={item.lastname} onChange={handleChange} />
              </div>
              <div className="newUserItem">
                <label>Нікнейм</label>
                <input type="text" name="username" placeholder="john123" value={item.username} onChange={handleChange} />
              </div>
              <div className="newUserItem">
                <label>Електронна пошта</label>
                <input type="email" name="email" placeholder="john@gmail.com" value={item.email} onChange={handleChange} />
              </div>
              <div className="newUserItem">
                <label>Пароль</label>
                <input type="password" name="password" placeholder="password" value={item.password} onChange={handleChange} />
              </div>
              <div className="newUserItem">
                <label>Адмін?</label>
                <select name="isAdmin" id="isAdmin" value={item.isAdmin} onChange={handleChange}>
                  <option value="true" >Так</option>
                  <option value="false">Ні</option>
                </select>
              </div>
            </form>
            <button className="deleteNewuser" onClick={() => { setId(item.uniid); deleteUser(item.uniid) }}>-</button>
          </div>
        )}
      </div>
      <button className="newUserButton" onClick={handleClick}>Створити</button>
    </div>
  );
}