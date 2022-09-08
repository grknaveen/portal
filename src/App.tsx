import React, { FC, ReactNode, useMemo } from 'react';
import Context from "./Components/Context"
import Content from "./Components/Content"
require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

let tokensInWallet: any = [];
const App: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default App;