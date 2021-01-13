import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

axios.defaults.baseURL = 'https://restcountries.eu/'
let newBorder = null;
let borderX = [];

class App extends Component {
  state = {
    countries: [],
    countryInfo: [],
    border: []
  }

  componentDidMount(){
    this.getCountries();  
  }

  getCountries = async () => {
    let response = await axios.get('/rest/v2/all?fields=name;alpha3Code');
    this.setState({
      ...this.state,
      countries: response.data
    })
  }

  getInfo = async (alpha3Code) => {
    let info = await axios.get('https://restcountries.eu/rest/v2/alpha/'+ alpha3Code)
    this.setState({
      countryInfo: info.data,
      border: []
    })
    this.getBorders();
  }
  getBorders = async () => {
    borderX = []
    for(let i = 0; i < this.state.countryInfo.borders.length; i++){
      newBorder = await axios.get('https://restcountries.eu/rest/v2/alpha/' +this.state.countryInfo.borders[i])
      borderX.push(newBorder.data.name)
      this.setState({
        border:borderX
      })
    }
  }

  render() {
    return (
      <div className="main">
      <div className="country">
          <p className="name">
            All Countries
          </p>
        </div>
        <div>
          
        </div>
      <div className="wrapper">
      <div className="container">
        {
        this.state.countries.map((country, index) => {
         return (<h3 onClick={() => this.getInfo(country.alpha3Code)} key={index}>{country.name}</h3>)
        })
        }
      </div>
      <div className="info">
        <div className="pop">
        <h1>{this.state.countryInfo.name}</h1>
        <h4>Capital: {this.state.countryInfo.capital}</h4>
        <h4>Population: {this.state.countryInfo.population}</h4>
        <ul> 
          Borders with:
        {
          this.state.border.map((side, index) =>{
            return (<li key={index}>{side}</li>)
          })
        }
        </ul>
        </div>
        <div className="image">
        <img src={this.state.countryInfo.flag}/>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

export default App;