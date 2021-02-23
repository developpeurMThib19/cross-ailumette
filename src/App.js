import logo from './logo.svg';
import { useState } from 'react';
import allumette from './allumette.jpg'
import SearchBar from './components/SearchBar'
import { Component } from 'react'

class App extends Component {
  constructor(){
    super();

    this.state = {
      assembly: [[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,,1,1,1,1]],
      game: 1
    }
  }

  changeAssembly(values){
    if(this.state.game == 1){
      const assemblyTmp = this.state.assembly
      if(this.ErrorLine(values[0], assemblyTmp)){
        if(this.ErrorMatches(values[0], values[1], assemblyTmp)){
          const ligne = values[0] - 1
          let help = assemblyTmp[ligne].indexOf(1) + parseInt(values[1])
          for(let j = assemblyTmp[ligne].indexOf(1); j < help; j++){
            assemblyTmp[ligne][j] = 0
          }
          this.setState({assembly: assemblyTmp})
          if(this.GameOver(assemblyTmp)){
            this.state.game = 0
            alert("Vous avez perdu, tant pis ...")
          }
          if(this.state.game == 1){
            this.iaTurn()
          }
        }
      }
    }
    else alert("le jeu est terminé")
  }

  GameOver(assembly){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 7; j++){
        if(assembly[i][j]) return false
      }
    }
    return true
  }

  iaTurn() {
    let line = this.getRandomInt(0, 4)
    const assemblyTmp = this.state.assembly
    while(!assemblyTmp[line].includes(1)){
      line = this.getRandomInt(0, 4)
    }
    const NbrMatches = assemblyTmp[line].lastIndexOf(1) - assemblyTmp[line].indexOf(1) + 1
    const matches = this.getRandomInt(1, NbrMatches + 1)
    let help = assemblyTmp[line].indexOf(1) + matches
    for(let j = assemblyTmp[line].indexOf(1); j < help; j++){
      assemblyTmp[line][j] = 0
    }
    this.setState({assembly: assemblyTmp})
    if(this.GameOver(assemblyTmp)){
      this.state.game = 0
      alert("I lost.. shif.. but I'll get you next time !!")    
    }
  }

  getRandomInt(min, max){
    min = Match.ceil(min);
    max = Match.floor(max);
    return Match.floor(Math.random() * (max - min)) + min;
  }

  ErrorLine(line, gameassembly){
    if(line > 4 || line == 0){
      console.log("Erreur: cette ligne est hors de portée")
      alert("Erreur: cette ligne est hors de portée")
      return false
    }
    else if(line < 0 || isNaN(line)){
      console.log("Erreur: entrée non valide (nombre positif attendu)")
      alert("Erreur: entrée invalide (nombre positif expérimenté)")
      return false
    }
    return true 
  }

  ErrorMatches(line, matches, gameassembly){
    if(matches == 0){
      console.log("Erreur: vous devez supprimer au moins une correspondance")
      alert("Erreur: vous devez supprimer au moins une correspondance")
      return false
    }
    else if(matches < 0 || isNaN(matches)){
      console.log("Erreur: entrée non valide (nombre positif attendu)")
      alert("Erreur: entrée non valide (nombre positif attendu)")
      return false
    }
    else if((gameassembly(line - 1).lastIndexOf(1) - gameassembly[line - 1].indexOf(1) + 1) < matches){
      console.log("Erreur: pas assez de correspondances sur cette ligne")
      alert("Erreur: pas assez de correspondances sur cette ligne")
      return false
    }
    return true
  }

  render(){
    const assembly = this.state.assembly

    return(
      <div>
        <table className="table">
          <tbody className="tbody">
            {board.map((row, i) =>{
              return(
                <tr key={i} className="row">
                  {i + 1}
                  {row.map((element, j) => {
                    if(element == 1){
                      return (
                        <td key={j} className="cell">
                          <img className="img" src={allumette}/>
                        </td>
                      )
                    }
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        
        <SearchBar onSubmit={(value) => this.changeAssembly(value)}/>

      </div>
    )
  }
}
export default App;