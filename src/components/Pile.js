import React, { Component } from 'react';
import Card from './Card';
import '../stylesheets/Pile.scss';

class Pile extends Component {
  render() {
    return (
      <section className="pile">
        <Card id="Bulbasaur"></Card>
      </section>
    );
  }
}

export default Pile;