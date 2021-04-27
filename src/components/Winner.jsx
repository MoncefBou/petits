import React from "react";
import WinnerGif from "../assets/pic/winner.gif";
import "./style/Winner.css";

class Winner extends React.Component {

    render() {
        return(
    <div className="winner" >
        <p className="pWins"> <span className={this.props.className}>{this.props.children}</span> Wins !</p>
        <div className="offset-3" style={{ background: `url(${WinnerGif})`, height: `${500}px`, backgroundRepeat: "no-repeat" }} />
      </div>
        )
    }
}

export default Winner;