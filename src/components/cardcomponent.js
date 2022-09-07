import {Button, Checkbox, Tooltip} from "react-daisyui";

function Card()
{
    return (
        <div className="card w-96 bg-base-50 shadow-xl image-full">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes"/></figure>
            <div className="card-body">
                <h2 className="card-title">NFT#1</h2>
                <div className="card-actions justify-end">
                    <div className="my-6">
                        <div className="my-6">
                            <Tooltip  message={"Burn"} color={"error"}      >
                                <Checkbox/>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card;
