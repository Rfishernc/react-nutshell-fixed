import React from 'react';
import './articles.scss';
import smashRequests from '../../helpers/data/smashRequests';
import authRequests from '../../helpers/data/authRequests';
import articleRequests from '../../helpers/data/articleRequests';
import Article from '../article/article';

class articles extends React.Component {
  state = {
    articlesList: [],
    isEditing: false,
    articleId: '',
  }

  refreshArticles = () => {
    smashRequests.getArticlesFromMeAndFriends(authRequests.getCurrentUid())
      .then((articlesArray) => {
        this.setState({ articlesList: articlesArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formTitle = () => {
    if (this.state.isEditing) {
      return 'Edit Article';
    }
    return 'Add A New Article';
  }

  editing = (currentId) => {
    if (this.state.isEditing === true) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true, articleId: currentId });
    }
  }

  articlesBuilder = () => {
    const articlesRender = [];
    this.state.articlesList.forEach((article) => {
      articlesRender.push(<Article title={article.title} synopsis={article.synopsis} url={article.url}
        key={article.id} id={article.id} refreshArticles={this.refreshArticles} uid={article.uid} editing={this.editing}/>);
    });
    return articlesRender;
  }

  articleBundler = () => {
    const article = {
      title: document.getElementById('articleName').value,
      synopsis: document.getElementById('articleSynopsis').value,
      url: document.getElementById('articleUrl').value,
      uid: authRequests.getCurrentUid(),
    };
    if (this.state.isEditing) {
      articleRequests.updateArticle(this.state.articleId, article);
    } else {
      articleRequests.postRequest(article)
        .then(() => {
          this.refreshArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    this.refreshArticles();
  }

  render() {
    return (
      <div>
        <h3 className='articleTitle'>Articles</h3>
        <div className='row ml-1 mr-0'>
          <div className='col-9'>{this.articlesBuilder()}</div>
          <div className='col-3'>
            <h4>{this.formTitle()}</h4>
            <form>
              <div className="form-group">
                <label for="articleName">Article Title</label>
                <input type="text" className="form-control" id="articleName" placeholder="Article Title"/>
              </div>
              <div class="form-group">
                <label for="articleSynopsis">Article Synopsis</label>
                <input type="text" className="form-control" id="articleSynopsis" placeholder="Synopsis"/>
              </div>
              <div class="form-group">
                <label for="articleUrl">Article URL</label>
                <input type="text" className="form-control" id="articleUrl" placeholder="URL"/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.articleBundler}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default articles;
