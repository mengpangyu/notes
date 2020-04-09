import React from 'react';

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      n: 1,
      width: undefined
    }
  }
  onclick = () =>{
    this.setState(state => ({n:state.n + 1}))
    this.setState(state => ({n:state.n - 1}))
  }
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return nextState.n !== this.state.n;
  // }
  componentDidMount() {
    let div = document.getElementById('xx')
    const {width} = div.getBoundingClientRect()
    this.setState({width})
  }

  render(){
    return (
      <div id="xx">
        {this.state.width}
      </div>
    )
  }
}

export default App;
