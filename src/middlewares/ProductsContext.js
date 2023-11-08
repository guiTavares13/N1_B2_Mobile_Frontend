import { createContext } from 'react';

const ProductsContext = createContext({
    productsContext: {},
    setProductsContext: () => {},
});

export default ProductsContext;
