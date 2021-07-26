import { useMemo } from "react";
import { Provider } from 'react-redux';
import { initializeStore } from "./store";
const withRedux = (PageComponent) => {
  
  const WrapperComponent = props => {
    const store = useMemo(getOrInitializeStore, []);
    
    return (
      <Provider store={store}>
        <PageComponent {...props}/>
      </Provider>
    );
  };


  return WrapperComponent;
};

let reduxStore;
export const getOrInitializeStore = (initialState) => {
  if (typeof window === "undefined") {
    return initializeStore(initialState);
  }

  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }
  return reduxStore;
};


export default withRedux;
