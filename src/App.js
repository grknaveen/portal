import './App.css';
import Cardlist from "./components/cardlistcomponent";
import Footer from "./components/footer";
import Headercomponent from "./components/headercomponent";

function App() {
  return (

    <div>
        <link href="App.css" rel="stylesheet"/>
        <Headercomponent/>
        <div style={style}>
        <Cardlist/>
        </div>
        <div style={style}>
            <Footer/>
        </div>
    </div>
  );
}

export default App;

const style = {
    paddingTop: "5%",

};