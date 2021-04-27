import React from "react";


class NumeroDee extends React.Component {

    render() {

        return (
            <div className="numeroDee">

                <span className="spanP1">{this.props.numDee}</span>
                <i className="fas fa-chess-knight logo "></i>

                <span className="spanP2">{this.props.numDee2}</span>
                <p className="rainbow">Petit Chevaux</p>
                <button className={this.props.player === 1 ? "b1" : "b2"} onClick={this.props.lancerDee}>Tirer dée du joueur {this.props.player}</button>

            </div>
        )
    }
}

export default NumeroDee;