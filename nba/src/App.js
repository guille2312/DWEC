import React, { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import  Form  from 'react-bootstrap/Form';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: null,
      Year: '',
      playerStats: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId()
    this.getYear()
    console.log(this.state.playerName)
  }

  handleChange = (event) => {

    const replace = event.target.value.split(" ").join("_");
    if (replace.length > 0) {
      this.setState({ playerName: replace })
    } else {
      alert("Please type players name!")
    }
  }

  getYear = (Year) => {
    this.state.year = Year
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
      .then(async res => {
        // console.log(res.data.data)
        if (res.data.data[0] === undefined) {
          alert("Este jugador no esta disponible")
        } else if (res.data.data.length > 1) {
          alert("Introduce el nombre completo")
        } else {
          await this.getPlayerStats(res.data.data[0].id)

        }
      }).catch(err => {
        console.log(err)
      })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${this.state.Year}&player_ids[]=${playerId}`)
      .then(async res => {
        console.log(res.data.data)
        this.setState({ playerStats: res.data.data[0] })
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="exampleFormControlInput1">Nombre Jugador</label>
            <input type="text" class="form-control" value={this.state.value} onChange={this.handleChange} />
          </div>

          <div class="form-group">
            <label for="exampleFormControlInput1">Año</label>

            <input class="form-control" value={this.state.Year} onChange={(e) => { this.setState({ Year: e.target.value }) }} type="text" id="age" />
          </div>


          <input class="btn btn-primary" type="submit" value="Submit" />
        </form>
     Partidos Jugados: {this.state.playerStats["games_played"]}
        <br />
     Puntos promediados: {this.state.playerStats["pts"]}
        <br />
     Rebotes promediados: {this.state.playerStats["reb"]}
        <br />
     Asistencias promediadas: {this.state.playerStats["ast"]}
        <br />
     Tapones promediadas: {this.state.playerStats["blk"]}

        <br />
     Robos promediadas: {this.state.playerStats["stl"]}

        <br />
     Perdidas promediadas: {this.state.playerStats["turnover"]}



      </div>

    );
  }
}
export default App;
