import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";


import commonerReducers from './slice/commonerSlice';
import uiReducer from './slice/uiSlice';
import gspFormReducers from './slice/gspFormSlice';
import certificateOriginReducer from './slice/CertificateOriginSlice';

const rootReducer = combineReducers({
    ui: uiReducer,
    commoner: commonerReducers,
    gspForm: gspFormReducers,
    certifcateOriginForm: certificateOriginReducer,
})

const persistConfig = {
    key:'root',
    storage,
    whitelist:['commoner','ui','gspForm','certifcateOriginForm']
}

const persistedReducers = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
})

export const persistor = persistStore(store);

// Define RootState type for use with useSelector
export type RootState = ReturnType<typeof store.getState>;
// Define AppDispatch type for use with useDispatch
export type AppDispatch = typeof store.dispatch;