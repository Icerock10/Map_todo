import React, { Component } from 'react';
class ServiceType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            src: this.props.src,
            class: this.props.class,
        }
      }
    render() {
        return (
            <div className="service__controller" onClick={() => this.props.onTypeChange(this.state.name)}>
               <div className="service_image">
                 <img src={this.state.src} alt="" />
               </div>
               <div className="service__description">
                {this.state.name}
               </div>
            </div>
        )
    }
}
export default ServiceType;
