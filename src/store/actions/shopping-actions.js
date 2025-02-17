import { DeleteData, GetData, PostData, PutData } from "../../utils";
import { landingProducts, productDetails } from "../shpping-slice";
import { addNewAddress, addToCart, addToWishlist, placeOrder, removeFromCart, removeFromWishlist } from "../user-slice";

export const onGetProducts = (payload) => async (dispatch) => {
    try {
        const response = await GetData("/");

        // dispatch({ type: Action.LANDING_PRODUCTS, payload: response.data });
        dispatch(landingProducts(response.data));
    } catch (err) {
        console.log(err);
    }
};

export const onGetProductDetails = (id) => async (dispatch) => {
    try {
        const response = await GetData("/" + id);

        // dispatch({ type: Action.PRODUCT_DETAILS, payload: response.data });
        dispatch(productDetails(response.data));
    } catch (err) {
        console.log(err);
    }
};

/* ------------------- Wishlist --------------------- */

export const onAddToWishlist = (_id) => async (dispatch) => {
    try {
        const response = await PutData("/wishlist", {
            _id,
        });

        // dispatch({ type: Action.ADD_TO_WISHLIST, payload: response.data });
        dispatch(addToWishlist(response.data));
    } catch (err) {
        console.log(err);
    }
};

export const onRemoveFromWishlist = (_id) => async (dispatch) => {
    try {
        const response = await DeleteData("/wishlist/" + _id);

        // dispatch({ type: Action.REMOVE_FROM_WISHLIST, payload: response.data });
        dispatch(removeFromWishlist(response.data));
    } catch (err) {
        console.log(err);
    }
};

/* ------------------- Cart --------------------- */

export const onAddToCart =
    ({ _id, qty }) =>
    async (dispatch) => {
        try {
            const response = await PutData("/cart", {
                _id,
                qty,
            });

            // dispatch({ type: Action.ADD_TO_CART, payload: response.data });
            dispatch(addToCart(response.data));
        } catch (err) {
            console.log(err);
        }
    };

export const onRemoveFromCart = (_id) => async (dispatch) => {
    try {
        const response = await DeleteData("/cart/" + _id);

        // dispatch({ type: Action.REMOVE_FROM_CART, payload: response.data });
        dispatch(onRemoveFromCart(response.data));
    } catch (err) {
        console.log(err);
    }
};

export const onCreateAddress =
    ({ street, postalCode, city, country }) =>
    async (dispatch) => {
        try {
            const response = await PostData("/customer/address/", {
                street,
                postalCode,
                city,
                country,
            });

            // dispatch({
            //     type: Action.ADDED_NEW_ADDRESS,
            //     payload: response.data,
            // });
            dispatch(addNewAddress(response.data));
        } catch (err) {
            console.log(err);
        }
    };

export const onPlaceOrder =
    ({ txnId }) =>
    async (dispatch) => {
        try {
            const response = await PostData("/shopping/order/", {
                txnId,
            });

            console.log(response.data, "ORDER");

            // dispatch({ type: Action.PLACE_ORDER, payload: response.data });
            dispatch(placeOrder(response.data));
        } catch (err) {
            console.log(err);
        }
    };
