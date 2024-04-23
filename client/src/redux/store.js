import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//creating local storage to keep track on states
const rootReducer = combineReducers({//merge all reducers
  user: userReducer,
  theme: themeReducer,
});

const persistConfig = {//config os persist
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => //without this error will happen
  getDefaultMiddleware({serializableCheck: false }),
})


export const persistor = persistStore(store);