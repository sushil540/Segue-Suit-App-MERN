import axios from "../config/axios"
export const SET_PRODUCTS = "SET_PRODUCTS"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const REMOVE_PRODUCT = "REMOVE_PRODUCT"
export const SET_PRODUCT_EDITID = "SET_PRODUCT_EDITID"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"

const setProducts = (products) =>{
    return {
        type:SET_PRODUCTS,
        payload:products
    }
}

export const startGetProducts = () =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.get('/api/products',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setProducts(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}

const addProduct = (product)=>{
    return {
        type:ADD_PRODUCT,
        payload:product
    }
}

export const startAddProduct = (formData) =>{
    return (dispatch) =>{
        (async () =>{
            try{
                const response = await axios.post('/api/products',formData,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(addProduct(response.data))
            }catch(e){  
                alert(e)
            }
        })()
    }       
}

export const removeProduct = (product) =>{
    return {
        type:REMOVE_PRODUCT,
        payload:product
    }
}

export const startRemoveProduct = (id) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.delete(`/api/products/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(removeProduct(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}

export const setEditId = (id) =>{
    return {
        type:SET_PRODUCT_EDITID,
        payload:id
    }
}


export const updateProduct = (product) =>{
    return {
        type:UPDATE_PRODUCT,
        payload:product
    }
}

export const startEditProduct = (product) =>{
    return (dispatch, getState) =>{
        (async () =>{
            try{    
                const editId = getState().product.editId
                const response = await axios.put(`/api/products/${editId}`,product,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(updateProduct(response.data))
                dispatch(setEditId(''))
            }catch(e){
                alert(e)
            }
        })()    
    }
}

export const startSearchProducts = (searchText) =>{
    return (dispatch) =>{
        (async()=>{
            try{
                const response = await axios.get(`/api/products/search?search=${searchText}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setProducts(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}