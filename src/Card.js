import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    state = {
        disabled: true,
        name: this.props.name,
        breed: this.props.breed,
        nickname: this.props.nickname
    }   

    handleEdit = (e) => {
        this.setState({
            disabled: false
        });
    }

    handleSave = () => {
        this.setState({
            disabled: true
        });
        return {
                name: this.state.name, 
                breed: this.state.breed, 
                nickname: this.state.nickname,
                id: this.props.key
               }
    }

    handleChange = (name) => e => {
        this.setState({ 
            [name]: e.target.value 
        });
      }

    render() {
    return (
    <div className="card">
        <div className="card-header">
            <div className="card-header-buttons">
                <button onClick={this.props.deleteCard} className="delete-button"><ion-icon name="close"></ion-icon></button>
                {!this.state.disabled ? 
                <button onClick={() => this.props.editCard(this.handleSave())} className="save-button"><ion-icon name="save"></ion-icon></button>
                    :
                <button onClick={this.handleEdit} className="edit-button"><ion-icon name="create"></ion-icon></button>
                }
            </div>
            <div className="card-id">Agent's file #<span>{this.props.id}</span></div>
        </div>
        <div className="card-item-container">Name: <input onChange={this.handleChange('name')} className="card-item" value={this.state.name} disabled={this.state.disabled}/></div>
        <div className="card-item-container">Breed: <input onChange={this.handleChange('breed')} className="card-item" value={this.state.breed} disabled={this.state.disabled}/></div>
        <div className="card-item-container">Nickname: <input onChange={this.handleChange('nickname')} className="card-item" value={this.state.nickname} disabled={this.state.disabled}/></div>
    </div>
    );
  }
}

export default Card;