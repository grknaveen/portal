import './App.css';
import Cardlist from "./components/cardlistcomponent";
import footer from "./components/footer";
import Headercomponent from "./components/headercomponent";

function App() {
  return (

    <div>
        <link href="App.css" rel="stylesheet"/>
        <Headercomponent/>
        <Cardlist/>
        <footer/>
    </div>
  );
}

export default App;
