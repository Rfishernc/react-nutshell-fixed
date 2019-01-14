import React from 'react';
import './articles.scss';
import smashRequests from '../../helpers/data/smashRequests';
import authRequests from '../../helpers/data/authRequests';
import articleRequests from '../../helpers/data/articleRequests';
import Article from '../article/article';

class articles extends React.Component {
  state = {
    articlesList: [],
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

  articlesBuilder = () => {
    const articlesRender = [];
    this.state.articlesList.forEach((article) => {
      articlesRender.push(<Article title={article.title} synopsis={article.synopsis} url={article.url} key={article.title}/>);
    });
    return articlesRender;
  }

  articleBundler = () => {
    const newArticle = {
      title: document.getElementById('articleName').value,
      synopsis: document.getElementById('articleSynopsis').value,
      url: document.getElementById('articleUrl').value,
      uid: authRequests.getCurrentUid(),
    };
    articleRequests.postRequest(newArticle)
      .then(() => {
        this.refreshArticles();
      })
      .catch((err) => {
        console.log(err);
      });
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
            <h4>Add A New Article</h4>
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
