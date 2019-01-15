import React from 'react';
import articleRequests from '../../helpers/data/articleRequests';
import authRequests from '../../helpers/data/authRequests';

class article extends React.Component {
  deleteArticle = (event) => {
    event.preventDefault();
    articleRequests.deleteArticle(this.props.id)
      .then(() => {
        this.props.refreshArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editArticle = (event) => {
    event.preventDefault();
    this.props.editing(this.props.id);
    document.getElementById('articleName').value = this.props.title;
    document.getElementById('articleSynopsis').value = this.props.synopsis;
    document.getElementById('articleUrl').value = this.props.url;
  }

  render() {
    if (this.props.uid === authRequests.getCurrentUid()) {
      return (
        <div className="card">
          <div className="card-header">
            {this.props.title}
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.synopsis}</p>
            <a href={this.props.url} className="btn btn-primary">{this.props.url}</a>
            <button type='button' className='btn btn-danger' onClick={this.deleteArticle}>Delete</button>
            <button type='button' className='btn btn-success' onClick={this.editArticle}>Edit</button>
          </div>
      </div>
      );
    }
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
