const initialSate = {
  user : "",
  logged : false
}

const reducer = (state = initialSate, action) =>{
  if(action.type === 'SET_USR'){
    return{
      ...state,
      user : action.usr
    }
  }
  if(action.type === 'SET_lOGGED'){
    return{
      ...state,
      logged : true
    }
  }
  if(action.type === 'LOGGED_OUT'){
    return{
      ...state,
      user: "",
      logged : false
    }
  }
  return state
}

export default reducer;