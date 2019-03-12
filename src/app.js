import React from 'react'
class App extends React.Component {
  render() {
      return (
        <div>
            <h1 className="title">Hello React & Webpack! & 是的</h1>
            <ul>
                {
                    ['a', 'b', 'c'].map(name => <li>{`I'm ${name}!`}</li> )
                }
            </ul>
        </div>
      )
  }
}

export default App