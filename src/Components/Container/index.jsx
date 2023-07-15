import React, { PureComponent } from 'react';
import "./style.css";

class Container extends PureComponent {
  render() {
    const { children, nospaces} =  this.props;
    return (
      <div className={`main__container ${nospaces ? "main__container--padding" : ""}`}>
        {children}
      </div>
    )
  }
}

export default Container;