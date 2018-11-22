import React, { useState } from 'react';
import { withConsumer } from './with';

const Context = React.createContext();

export function PageDataProvider({ defaultPageData = {}, children }) {
  const [pageData, setPageData] = useState(defaultPageData);

  const value = {
    pageData,
    setPageData: data => setPageData(old => ({ ...old, ...data })),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const WithPageData = Context.Consumer;
export const withPageData = withConsumer(WithPageData);
