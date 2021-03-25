// import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

const list = [
	{
		title: 'React',
		url: 'https://reactjs.org/',
		author: 'Jordan Walke',
		num_comments: 3,
		points: 4,
		objectID: 0,
	},
	{
		title: 'Redux',
		url: 'https://redux.js.org/',
		author: 'Dan Abramov, Andrew Clark',
		num_comments: 2,
		points: 5,
		objectID: 1,
	},
];


class App extends Component {
	constructor(props) {
    super(props);

    this.state = {
      list,
    }

    this.onDismiss.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        {this.state.list.map(item =>
          <div key={item.objectID}>
            <p>
              <a href={item.url}>{item.title}</a>
            </p>
            <p>{item.author}</p>
            <p>{item.num_comments}</p>
            <p>{item.points}</p>
            <p>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Відкинути
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
