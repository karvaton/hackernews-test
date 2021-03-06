// import logo from './logo.svg';
import './App.css';
import { Component } from 'react';


const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


const largeColumn = { width: '40%' };
const midColumn = { width: '30%' };
const smallColumn = { width: '10%' };

const isSearched = searchTerm => item =>
	item.title.toLowerCase().includes(searchTerm.toLowerCase());


const Search = ({ value, onChange, children }) =>
	<form>
		{children}
		<input
			type="text"
			value={value}
			onChange={onChange}
		/>
</form>


const Table = ({ list, pattern, onDismiss }) =>
	<div className="table">
		{list.filter(isSearched(pattern)).map(item =>
			<div key={item.objectID} className="table-row">
				<span style={largeColumn}>
					<a href={item.url}>{item.title}</a>
				</span>
				<span style={midColumn}>
					{item.author}
				</span>
				<span style={smallColumn}>
					{item.num_comments}
				</span>
				<span style={smallColumn}>
					{item.points}
				</span>
				<span style={smallColumn}>
					<Button
						onClick={() => onDismiss(item.objectID)}
						className="button-inline"
					>
						Відкинути
                    </Button>
				</span>
			</div>
		)}
</div>


const Button = ({ onClick, className = '', children }) =>
	<button
		onClick={onClick}
		className={className}
		type="button"
	>
	{children}
</button>



class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			result: null,
			searchTerm: DEFAULT_QUERY,
		};

		this.setSearchTopStories = this.setSearchTopStories.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	setSearchTopStories(result) {
		this.setState({result});
	}

	onDismiss(id) {
		const isNotId = item => item.objectID !== id;
		const updatedHits = this.state.result.hits.filter(isNotId);
		this.setState({
			result: {...this.state.result, hits: updatedHits}
		});
	}

	componentDidMount() {
		const {searchTerm} = this.state;

		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
		.then(response => response.json())
		.then(result => this.setSearchTopStories(result))
		.catch(error => error);
	}

	render() {
		const {searchTerm, result} = this.state;

		if (!result) { return null; }
		return (
			<div className="page">
				<div className="interection">
					<Search
						value={searchTerm}
						onChange={this.onSearchChange}
					>
						Пошук
                    </Search>
				</div>
				{result ? 
				<Table 
					list={result.hits}
					pattern={searchTerm}
					onDismiss={this.onDismiss}
				/> : 
				null}
			</div>
		);
	}
}

export default App;
