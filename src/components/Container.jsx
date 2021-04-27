import React from "react";
import Circle from "./Circle";

class Container extends React.Component {

    render() {

        return(
            <div className={this.props.containerName}>
            <div className={this.props.childName}>
              <div >
                <Circle circleColor={this.props.player[0] ? this.props.color : "black"} /> 
                <Circle circleColor={this.props.player[1] ? this.props.color : "black"} />
              </div>

              <div >
                <Circle circleColor={this.props.player[2] ? this.props.color : "black"} />
                <Circle circleColor={this.props.player[3] ? this.props.color : "black"} />
              </div>
            </div>
          </div>
        )
    }
}

export default Container;