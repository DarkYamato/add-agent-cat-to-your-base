import React, { Component } from 'react';
import Card from './Card.js';
import './App.css';

class App extends Component {
  state = {
    name: '',
    breed: '',
    cards: ''
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  handleChangeBreed = (e) => {
    this.setState({
      breed: e.target.value,
    })
  }

  handleSubmit = () => {
    const { name, breed } = this.state;

    fetch('http://localhost:3001/cards', {
      method: 'post',
      headers: {  
        "Content-Type": "application/json; charset=utf-8" 
      },
      body:JSON.stringify({ name, breed })
    });
  }

  getCards = () => {
    fetch('http://localhost:3001/cards').then(res => this.setState({
      cards: res
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="add-card">
          <div className="add-card__title">Добавьте кота</div>
          <span>Имя: </span><input onChange={this.handleChangeName} value={this.state.name} className="add-card__input" type="text"/>
          <span>Порода: </span><input onChange={this.handleChangeBreed} value={this.state.breed} className="add-card__input" type="text"/>
          <button onClick={this.handleSubmit} className="add-card__button">Сохранить</button>
        </div>
        <Card/>
      </div>
    );
  }
}

export default App;
