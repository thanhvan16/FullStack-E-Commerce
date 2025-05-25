
const cartReducer=(state=[], action)=>{
    const product=action.payload;
    let newState=[...state]
    switch (action.type) {
      case "ADD_TO_CART":
        return [
            ...state,
            {
              ...product,
              size:action.size,
              quantity:1
            }
      ]
      case "INCREASE":
        const itemUpdatePlus= newState.find(item=> (item.id===action.id && item.size===action.size ))
        itemUpdatePlus.quantity=itemUpdatePlus.quantity+ action.quantity;
        return newState;

      case "DECREASE":
        const itemUpdateMinus= newState.find(item=> (item.id===action.id && item.size===action.size))
        if(itemUpdateMinus.quantity===1){
          return newState.filter(item => !(item.id === action.id && item.size === action.size));
        }
        else{
           itemUpdateMinus.quantity=itemUpdateMinus.quantity+action.quantity;
          return newState
        }
        return newState;
      case "DELETE":
        const updateItem = newState.filter(item => !(item.id === action.id && item.size === action.size));
        return updateItem;
      default:
       return state;
    }
}
export default cartReducer