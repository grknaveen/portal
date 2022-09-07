import {Button, ButtonGroup} from "react-daisyui";

function Footer()
{
    return(
        <div className="w-full h-16 bg-base-100 z-50 border-t-2 border-white fixed left-0 bottom-0 flex justify-center items-center text-black text-2xl">
            <span className="pl-5">NFT selected :</span>
            <ButtonGroup >
                <Button active>Burn</Button>
                <Button>Claim</Button>
            </ButtonGroup>
        </div>
    )
}
export default Footer;