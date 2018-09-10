import React, { Component } from 'react';
import Card from './Card.js';
import './App.css';

class App extends Component {
  state = {
    name: '',
    breed: '',
    nickname: '',
    cards: []
  }

  componentDidMount(){
    this.getCards();
  }

  handleChange = (name) => e => {
    this.setState({ 
        [name]: e.target.value 
    });
  }

  handleSubmit = () => {
    const { name, breed, nickname } = this.state;

    fetch('http://localhost:3001/cards', {
      method: 'post',
      headers: {  
        "Content-Type": "application/json; charset=utf-8" 
      },
      body:JSON.stringify({ name, breed, nickname })
    })
    .then(this.setState({
      name: '',
      breed: '',
      nickname: ''
    }))
    .then(() => this.getCards());
    
  }

  getCards = () => {
    fetch('http://localhost:3001/cards')
    .then(res => res.json())
    .then(res => this.setState({
      cards: res
    }));
    
  }

  deleteCard = (id) => {
    fetch(`http://localhost:3001/cards/${id}`, {
        method: 'delete'
    })
    .then(() => this.getCards());
}

  editCard = (card) => {
    fetch(`http://localhost:3001/cards/${card.id}`, {
        method: 'put',
        headers: {  
          "Content-Type": "application/json; charset=utf-8" 
        },
        body:JSON.stringify({ name: card.name, breed: card.breed, nickname: card.nickname })
      })
    .then(() => this.getCards());
  }

  render() {
    return (
      <div className="App">
        <div className="add-card">
          <div className="add-card-title">Add an agent (cat)</div>
          <div className="add-card-inputs">
            <div className="input-block">
              <span>Name: </span><input onChange={this.handleChange('name')} value={this.state.name} className="add-card-input" type="text"/>
            </div>
            <div className="input-block">  
              <span>Breed: </span><input onChange={this.handleChange('breed')} value={this.state.breed} className="add-card-input" type="text"/>
            </div>
            <div className="input-block">
              <span>Nickname: </span><input onChange={this.handleChange('nickname')} value={this.state.nickname} className="add-card-input" type="text"/>
            </div>         
          </div>
          <button onClick={this.handleSubmit} className="add-card-button">Add to base</button>
        </div>
        <div className="items">
          {this.state.cards.map((x,i) => 
            <Card name={x.name} breed={x.breed} nickname={x.nickname} id={i+1} deleteCard={()=> this.deleteCard(x.id)} editCard={this.editCard} key={x.id} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
