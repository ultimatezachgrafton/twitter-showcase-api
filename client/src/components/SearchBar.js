import React from 'react';
import Form from 'react-bootstrap/Form';
import "../css/SearchBar.css"

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            searchType: 'Username'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
        console.log(this.state.inputValue);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(this.state.inputValue + this.state.searchType);
        this.props.handleData(this.state.inputValue, this.state.searchType);
        console.log(this.state.inputValue + this.state.searchType);
    }

    handleSelect = (event) => {
        this.setState({
            searchType: event.target.value
        });
    }

    render() {

        return (
            <form className="mb-3" id="search-bar" onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlSelect1" className="select">
                    <Form.Control as="select" onChange={this.handleSelect}>
                        <option value="Username">Username</option>
                        <option value="Keyword">Keyword</option>
                    </Form.Control>
                </Form.Group>

                <input
                    id="searchBar"
                    name="searchBar"
                    placeholder="Search..."
                    value={this.inputValue}
                    onChange={this.handleChange}
                    required/>
                <button id="submit-btn" type="submit" className="btn btn-dark">Submit</button>
            </form>
        )
    }
}

export default SearchBar;