import React from 'react';

class article extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          {this.props.title}
        </div>
        <div className="card-body">
          <p className="card-text">{this.props.synopsis}</p>
          <a href={this.props.url} className="btn btn-primary">{this.props.url}</a>
        </div>
    </div>
    );
  }
}

export default article;
