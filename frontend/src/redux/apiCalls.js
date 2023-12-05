import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registrationFailure,
  registrationStart,
  registrationSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  addCart,
  deleteCart,
  getCart,
  updateaddCart,
  updatereduceCart,
} from "./cartRedux";

/* export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
 */
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const token = res.data.accessToken;
    userRequest.interceptors.request.use(
      function (config) {
        config.headers.token = "Bearer " + token;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registrationStart());
  try {
    /* const res = await userRequest.post(`/auth/register`, user); */
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registrationSuccess(res.data));
  } catch (err) {
    dispatch(registrationFailure());
  }
};

export const logOut = async (dispatch) => {
  dispatch(logout());
};

export const getCarts = async (userId, dispatch) => {
  try {
    const res = await userRequest.get(`/carts/${userId}`);
    console.log("res: ", res.data);
    dispatch(getCart(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const addCarts = async (product, dispatch) => {
  try {
    const res = await userRequest.post(`./carts/`, product);
    dispatch(addCart(res.data.products[0]));
  } catch (err) {
    console.log(err);
  }
};

export const deleteCarts = async (id, product, dispatch) => {
  try {
    const res = await userRequest.delete(`/carts/${id}`, { product });
    console.log("res: ", res);
    dispatch(deleteCart(product, dispatch));
  } catch (err) {
    console.log(err);
  }
};

export const updateaddCarts = async (id, product, dispatch) => {
  try {
    const res = await userRequest.put(`/carts/${id}`, { product });
    dispatch(updateaddCart({ product }));
  } catch (err) {
    console.log(err);
  }
};

export const updatereduceCarts = async (id, product, dispatch) => {
  try {
    const res = await userRequest.put(`/carts/${id}`, { product });
    dispatch(updatereduceCart({ product }));
  } catch (err) {
    console.log(err);
  }
};

/* export const deleteProducts = async (id, user) => {
  dispatch(deleteProductStart());
  try {
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
}; */
