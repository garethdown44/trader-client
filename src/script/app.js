import React from 'react'
import {render} from 'react-dom'

var Root = React.createClass({
  render: function() {
    return <div>hello there</div>;
  }
});

render(<Root />, document.getElementById('cont'))