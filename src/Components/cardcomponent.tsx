import {Button, Checkbox, Tooltip} from "react-daisyui";
import React from "react";


class Card extends React.Component {
    state= {
        Nfts:''
    }
    render() {
        return(
            <div className="card w-aut bg-base-50 shadow-xl image-full ">
                <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes"/></figure>

                <div className="card-body">
                    <h2 className="card-title">NFT#1</h2>
                    <Checkbox className="absolute bottom-0 right-0 h-10 w-10 mb-2 mr-2"/>
                </div>
            </div>
        );
    }
}

export default Card;

