import React, { Component } from 'react';
import './Conversor.css';

export default class Conversor extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
        }
        this.converter = this.converter.bind(this);
    }

    converter(){
      let valorMoedaA = `${this.props.moedaA}`;
      let valorMoedaB = `${this.props.moedaB}`;
      const key = process.env.REACT_APP_API_KEY;
      let url = `https://api.freecurrencyapi.com/v1/latest?apikey=${key}&currencies=${valorMoedaB}&base_currency=${valorMoedaA}`;
      console.log(this.state);
      
      fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        let cotacao = json.data[valorMoedaB];
        let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2);
        this.setState({moedaB_valor});
        console.log(moedaB_valor);
        
      })
      
    }

    render() {
      return (
      <div className='conversor'>
          <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
          <input type="number" onChange={(event) => {this.setState({moedaA_valor:event.target.value})}}></input>
          <input type="button" value="Converter" onClick={this.converter}></input>
          <h2>{this.state.moedaB_valor}</h2>
      </div>
      )
    }
}