import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods"
import { updateProducts } from "../../redux/apiCalls";

export default function Product() {
    /*     const location = useLocation()
        const dispatch = useDispatch()
        const productId = location.pathname.split("/")[2]
        const [pStats, setPStats] = useState([])
        const product = useSelector((state) => state.product.products.find((product) => product._id === productId))
        const [inputs, setInputs] = useState({ ...product })
        const [file, setFile] = useState(`${product.img}`)
        const [cat, setCat] = useState([`${product.categories}`])
        const [sz, setSz] = useState([`${product.size}`])
        const [clr, setClr] = useState([`${product.color}`]) */

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    const [inputs, setInputs] = useState({});
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setInStock] = useState("")
    const [cat, setCat] = useState([]);
    const [sz, setSz] = useState([""])
    const [clr, setClr] = useState([""])
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );

/*     const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }; */

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleDesc = (e) => {
        setDesc(e.target.value);
    };
    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleCat = (e) => {
        setCat(e.target.value.split(","))
    }

    const handleInStock = (e) => {
        setInStock(e.target.value);
      };

    const handleSz = (e) => {
        setSz(e.target.value.split(","))
    }

    const handleClr = (e) => {
        setClr(e.target.value.split(","))
    }

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("./orders/income/" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    /* const handleClick = (e) => {
        e.preventDefault()
        const newproduct = { ...inputs };
        updateProducts(product._id, newproduct, dispatch)
    } */
    const handleClick = (e) => {
        e.preventDefault();
        const product = { _id: productId, title: title, desc: desc, price: price, inStock: stock, categories: cat, year_of_publication: sz, publication: clr };
        updateProducts(productId, product, dispatch);
        console.log(product)
      };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Товар</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Створити</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Ефективність продажів" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Опис:</span>
                            <span className="productInfoValue">{product.desc}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Категорія:</span>
                            <span className="productInfoValue">{product.categories}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Рік видання:</span>
                            <span className="productInfoValue">{product.year_of_publication}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Видавництво:</span>
                            <span className="productInfoValue">{product.publication}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Ціна:</span>
                            <span className="productInfoValue">{product.price}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Наявність:</span>
                            <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Назва книги</label>
                        <input name="title" type="text" placeholder={product.title} onChange={handleTitle} />
                        <label>Опис книги</label>
                        <input name="desc" type="text" placeholder={product.desc} onChange={handleDesc} />
                        <label>Категорія книги</label>
                        <input name="categories" type="text" placeholder={product.categories} onChange={handleCat} />
                        <label>Рік видавництва книги</label>
                        <input name="year_of_publication" type="text" placeholder={product.year_of_publication} onChange={handleSz} />
                        <label>Видавництво</label>
                        <input name="publication" type="text" placeholder={product.publication} onChange={handleClr} />
                        <label>Ціна</label>
                        <input name="price" type="number" placeholder={product.price} onChange={handlePrice} />
                        <label>Наявність</label>
                        <select name="inStock" id="idStock" onChange={handleInStock}>
                            {/* <option value={product.inStock} selected="selected">Вибрати</option> */}
                            <option value="Yes">Так</option>
                            <option value="No">Ні</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            {/* <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} /> */}
                        </div>
                        <button onClick={handleClick} className="productButton">Оновити</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
