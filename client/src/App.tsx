import * as React from 'react';
import Form from './components/Form'
import MyClass from './components/MyClass'
import MyComp from './components/MyComp'


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <MyClass isTrue={true} />
        <MyComp name={'Tom'} />
        <hr />
        <Form text="hello" />
      </div>
    );
  }
}

export default App;
