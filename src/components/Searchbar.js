import React, { Component } from 'react';

export class Searchbar extends Component {
    state = {
        query: '',
    };

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { query } = this.state;
        this.props.onSubmit(query);
        this.setState({ query: '' });
    };

    render() {
        const { query } = this.state;

        return (
            <header className="searchbar">
            <form className="search-form" onSubmit={this.handleSubmit}>
                <button type="submit" className="search-form-button">
                <span className="search-form-button-label">Search</span>
                </button>

                <input
                className="search-form-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={query}
                onChange={this.handleChange}
                />
            </form>
            </header>
        );
    }
};