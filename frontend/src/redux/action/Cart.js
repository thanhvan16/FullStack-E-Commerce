 export const addProduct=(item, size)=>{
    return {
        type :"ADD_TO_CART",
        payload: item,
        size: size,
        
 }
}


export const increaseProduct=(item, quantity=1)=>{
    return {
        type :"INCREASE",
        payload: item,
        size: item.size,
        quantity:quantity,
        id: item.id
 }
}
export const decreaseProduct=(item, quantity=-1)=>{
    return {
        type :"DECREASE",
        size: item.size,
        payload: item,
        quantity:quantity,
        id: item.id
 }
}
export const deleteProduct=(item)=>{
    return {
        type :"DELETE",
        payload: item,
        size: item.size,
        id: item.id
        
 }
}




