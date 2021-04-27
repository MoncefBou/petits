import React from "react";
import './App.css'
import Circle from "./components/Circle.jsx"
import Winner from "./components/Winner";
import Container from "./components/Container";
import NumeroDee from "./components/NumeroDee";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      numDee: [0, 0],
      numCase: [0, 0],
      player1Tokens: [false, false, false, false],
      player2Tokens: [false, false, false, false],
      currentPlayer: 1

    }

    this.lancerDee = this.lancerDee.bind(this)
    this.renderVictory = this.renderVictory.bind(this)
  }


  lancerDee() {
    // dee génére un chiffre entre 1 et 6 au hasard
    const dee = Math.floor(Math.random() * 6 + 1)
// Ici on sait c'est au tour de quel joueur
    const player = this.state.currentPlayer
// Si c'est le joueur 1
    if (player === 1) {
// Si le lancé vaut 6 ou si le joueur est à une case différente de 0
// ça permet de ne paser commencer temps que le joueur n'a pas fait 6 au départ
      if (this.state.numCase[0] !== 0 || dee === 6) {
        
        const newNumDee = this.state.numDee
        const newNumCase = this.state.numCase
        
        newNumDee[0] = dee
        newNumCase[0] = newNumCase[0] + dee;


        
        this.setState({
          numDee: newNumDee,
          numCase: newNumCase,
          currentPlayer: 2
        })
      } else {
        const newNumDee = this.state.numDee
        
        newNumDee[0] = dee
        
        this.setState({
          numDee: newNumDee,
          currentPlayer: 2
        })
      }

// Si c'est le joueur 2
    } else if (player === 2) {
// Pareil qu'en haut.
      if (this.state.numCase[1] !== 0 || dee === 6) {
        
        const newNumDee = this.state.numDee
        const newNumCase = this.state.numCase
        
        newNumDee[1] = dee
        newNumCase[1] = newNumCase[1] + dee;
        
        this.setState({
          numDee: newNumDee,
          numCase2: newNumCase,
          currentPlayer: 1
        })
      } else {
        const newNumDee = this.state.numDee
        
        newNumDee[1] = dee
        
        this.setState({
          numDee: newNumDee,
          currentPlayer: 1
        })
      }

    }
  }

  // Cette méthode permet de générer les cercles et de les colorer en rouge, bleu ou noir
  renderCircles(n, p) {
    let circlesArray = []

    // Cette boucle permet de colorié le bon cercle où se trouve chaque joueur et le reste en noir
    for (let index = n; index <= p; index++) {

      if (this.state.numCase[1] === index) {
        circlesArray.push(<Circle key={index} circleColor="#ec4444" />)
      } else if (this.state.numCase[0] === index) {
        circlesArray.push(<Circle key={index} circleColor="#4480ec" />)
      } else {
        circlesArray.push(<Circle key={index} circleColor="black" />)
      }

    // Si le joueurs a dépassé la case 37 alors on change un élément de playerTokens en true
    // ensuite on vérifie si il y a encore un false dans playerTokens, si il en reste alors
    // cela veut dire qu'il reste au moins un pions dans sa base donc le jeu continue
    // avec un pion qu'on place à la case 1. Si il n'y a plus de false, 
    // le render conditionnel de victoire s'active.
      if (this.state.numCase[0] > 37) {
        const arrayTokens = [...this.state.player1Tokens]
        const indexFirstFalse = arrayTokens.indexOf(false)
        const newNumCase = this.state.numCase

        arrayTokens[indexFirstFalse] = true
        newNumCase[0] = 1;

        this.setState({

          numCase: newNumCase,
          player1Tokens: arrayTokens
        })
      } else if (this.state.numCase[1] > 37) {
        
        const arrayTokens2 = [...this.state.player2Tokens]
        const indexSecondFalse = arrayTokens2.indexOf(false)
        const newNumCase = this.state.numCase

        arrayTokens2[indexSecondFalse] = true
        newNumCase[1] = 1;

        this.setState({

          numCase: newNumCase,
          player2Tokens: arrayTokens2

        })
      }
    }
    return circlesArray
  }

  renderVictory() {
    // Si il ne reste plus de pion dans la base d'un des 2 joueurs alors on active le render conditionnel de V.
    if (this.state.player1Tokens.indexOf(false) === -1 || this.state.player2Tokens.indexOf(false) === -1) {
      return (
        <Winner className={this.state.currentPlayer === 2 ? "spanP1" : "spanP2"} >
          {this.state.currentPlayer === 2 ? "Player 1" : "Player 2"}
        </Winner>
      )
    } else {
      return (

        <div className=" bg-g">
          <div className="offset-2 py-4">
            <div id="jeu">

              <div className="grid-game">

                {this.renderCircles(1, 1)}

                <div className="flex">
                  {this.renderCircles(2, 9)}
                </div>

                {this.renderCircles(10, 10)}

                <div className="flex grid-item-4">
                  {this.renderCircles(29, 36)}
                </div>

                <div className="flex grid-item-5">

                  <Container
                    containerName="containerP1"
                    childName="divchildP1"
                    player={this.state.player1Tokens}
                    color="#4646e8" />

                  <Container
                    containerName="containerP2"
                    childName="divchildP2"
                    player={this.state.player2Tokens}
                    color="#c30c0c" />

                  <NumeroDee
                    player={this.state.currentPlayer}
                    numDee={this.state.numDee[0]}
                    numDee2={this.state.numDee[1]}
                    lancerDee={this.lancerDee} />

                </div>

                <div className="flex grid-item-6">
                  {this.renderCircles(11, 18)}
                </div>

                {this.renderCircles(28, 28)}

                <div className="flex grid-item-8">
                  {this.renderCircles(20, 27)}
                </div>

                {this.renderCircles(19, 19)}

              </div>

            </div>
          </div>
        </div>
      )
    }
  }

  render() {

    return (
      <div>{this.renderVictory()}</div>
    )
  }

}

export default App

