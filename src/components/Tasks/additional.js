import React, { Component } from 'react';

const categories = {
  Electrician : ["Screw in a light bulb","Change wiring","Make the switch"],
  Plumber : ["Unlock a toilet","Unlock a sink","Fix a water leak","Fix the shower"],
  Gardener : ["Shear grass","Trim the bushes","plant a tree","make a fountain"],
  Housekeep : ["Wash the stove","Clean the kitchen","clean the room"],
  Flunkey : ["Cook meat","Cook pie","Cook fish","Cook potatoes"],
};

class Additional extends Component {
    render() {
      return (
        <div className="wrapper__additional">
          {categories[this.props.currentActive].map((add, index) => {
            return <div key={index} className='additional_items' onClick={(e) => this.props.onAdditionalChange(add)}>{add}</div>
           })}
       </div>
      )
    }
}

export default Additional;
