import { useState } from "react";
import "./newProduct.css";
//import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
//import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addProducts } from "../../redux/apiCalls";

export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const [sz, setSz] = useState([])
  const [clr, setClr] = useState([])
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }

  const handleSz = (e) => {
    setSz(e.target.value.split(","))
  }

  const handleClr = (e) => {
    setClr(e.target.value.split(","))
  }

  const handleClick = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat, year_of_publication: sz, publication: clr };
          addProducts(product, dispatch)
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Новий товар</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Фото</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Назва</label>
          <input name="title" type="text" placeholder="До зустрічі з тобою" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Опис</label>
          <input name="desc" type="text" placeholder="description..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Категорії</label>
          <input type="text" placeholder="jeans, dresses" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Видавництво</label>
          <input type="text" placeholder="Vivat, ..." onChange={handleSz} />
        </div>
        <div className="addProductItem">
          <label>Рік видавництва</label>
          <input type="text" placeholder="2020, 2023" onChange={handleClr} />
        </div>
        <div className="addProductItem">
          <label>Ціна</label>
          <input name="price" type="number" placeholder="100" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Наявність</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Так</option>
            <option value="false">Ні</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Створити</button>
      </form>
    </div>
  );
}