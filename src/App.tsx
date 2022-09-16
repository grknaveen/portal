import React, { FC, ReactNode, useMemo } from 'react';
import Context from "./Components/Context"
import Content from "./Components/Content"
import Headercomponent from './Components/headercomponent';
import Cardlist from './Components/cardlistcomponent';
import Footer from './Components/footer';
require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

let tokensInWallet: any = [];
const App: FC = () => {
  return (
    <Context>
        <Headercomponent/>
        <div style={style}>
            <Cardlist/>
        </div>
            <Footer/>
    </Context>
  );
};
export default App;

const style = {
    paddingTop: "5%",

};