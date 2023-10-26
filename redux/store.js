import { 
    createStore, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import MainReducer from './reducers'

const enhancer = applyMiddleware(
    thunk,
)

export default createStore(
    MainReducer,
    window.__REDUX_DEVTOOLS_EXENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    enhancer
)