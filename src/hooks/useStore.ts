import { useReducer } from "react"
import { type FromLanguage, type Language, type Action, type State } from "../types.d"
import { AUTO_LANGUAGES } from "../constant"

//iniciamos el estado de la app
const initialState: State ={
    fromLanguage:'auto',
    toLanguage:'en',
    fromText:'',
    result:'',
    loading: false
  
  }
  
  //create a reducer
   function reducer(state: State , action: Action){
  
    const { type } = action
  
    if (type === 'INTERCHANGE_LANGUAGES' ){
      //logica del estado dentro del reducer, porque lo evitamos dentro de los componentes
      if(state.fromLanguage == AUTO_LANGUAGES) return state
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    }
  
    if (type === 'SET_FROM_LANGUAGE'){
     if (state.fromLanguage == action.payload) return state

     const loading = state.fromText != ''
      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading
      }
    }
  
    if ( type === 'SET_TO_LANGUAGE'){

      if (state.toLanguage == action.payload) return state

     const loading = state.fromText != ''
      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading
      }
    }
  
    if ( type === 'SET_FROM_TEXT'){
      const loading = action.payload != ''
      return {
        ...state,
        loading,
        fromText: action.payload,
        result: '',

      }
    }
  
    if ( type === 'SET_RESULT'){
      return {
        ...state,
        loading: false,
        result: action.payload
      }
    }
  
      return state;
  
   }


export function useStore () {

     //use te hook useReducer
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch ({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch ({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch ({ type: 'SET_TO_LANGUAGE', payload })
  }
  const setFromText = (payload: string) => {
    dispatch ({ type: 'SET_FROM_TEXT', payload })
  }
  const setResult = (payload: string) => {
    dispatch ({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setFromText,
    setToLanguage,
    setResult
  }

}
  