import React, { Component } from 'react';
import Card from './Card';
import '../stylesheets/Pile.css';

class Pile extends Component {
  render() {
    return (
      <section class="pile">
        <Card id="Bulbasaur"></Card>
      </section>
    );
  }
}

export default Pile;