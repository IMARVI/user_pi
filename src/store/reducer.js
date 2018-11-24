const initialSate = {
  user : "",
  logged : false,
  usuariosTodos : [],
  usrdatos: ""
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
  if(action.type === 'SET_USUARIOS'){
    return{
      ...state,
      usuariosTodos : action.usuariosTodos
    }
  }
  if(action.type === 'SET_DATOS'){
    return{
      ...state,
      usrdatos : action.usrdatos
    }
  }
  return state
}

export default reducer;
