import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dimensionsSlice from './dimensionsSlice'
import curentSlice from './curentSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  version: 1
}

const reducer = combineReducers({
  dimensions: dimensionsSlice,
  currentId: curentSlice
})

const persisted = persistReducer(persistConfig, reducer)


export const store = configureStore({
  reducer: persisted,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

