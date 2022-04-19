import { AppRouter } from "./routers/AppRouter";
import {store} from './store/store';
import { Provider } from 'react-redux';

export const ArandaApp = () => {
  return (
    <Provider store={store}>
        
        <AppRouter/>
      
    </Provider>
  )
}
