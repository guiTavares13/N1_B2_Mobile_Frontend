import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router/router';
import UserContext from './src/middlewares/UserContext';
import WorkerContext from './src/middlewares/WorkerContext';
import CompanyContext from './src/middlewares/CompanyContext';
import ProductsContext from './src/middlewares/ProductsContext';
import TypeProductsContext from './src/middlewares/TypeProductsContext';

function App() {
  const [userContext, setUserContext] = useState({});
  const [workerContext, setWorkerContext] = useState({});
  const [companyContext, setCompanyContext] = useState({});
  const [productsContext, setProductsContext] = useState({});
  const [typeProductsContext, setTypeProductsContext] = useState([]);


  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      <TypeProductsContext.Provider value={{typeProductsContext, setTypeProductsContext}}>
        <ProductsContext.Provider value={{ productsContext, setProductsContext }}>
          <WorkerContext.Provider value={{workerContext, setWorkerContext}}>
            <CompanyContext.Provider value={{companyContext, setCompanyContext}}>
              <NavigationContainer>
                <Router />
              </NavigationContainer>
            </CompanyContext.Provider>
          </WorkerContext.Provider>
        </ProductsContext.Provider>
      </TypeProductsContext.Provider>

    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default App;
