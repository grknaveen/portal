import Card from "./cardcomponent";
import {Button, ButtonGroup, Divider} from "react-daisyui";

function Cardlist() {
    return(
    <div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:card-side">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>

        <div style={style}>

            <ButtonGroup >
                <Button active>Burn</Button>
                <Button>Claim</Button>
            </ButtonGroup>
        </div>
    </div>
    )
}
export default Cardlist;
const style = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "10%",
    width: "100%",

};