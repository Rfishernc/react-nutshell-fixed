import React from 'react';
import './articles.scss';
import smashRequests from '../../helpers/data/smashRequests';
import authRequests from '../../helpers/data/authRequests';
import Article from '../article/article';

class articles extends React.Component {
  state = {
    articlesList: [],
  }

  articlesBuilder = () => {
    const articlesRender = [];
    this.state.articlesList.forEach((article) => {
      articlesRender.push(<Article title={article.title} synopsis={article.synopsis} url={article.url} key={article.title}/>);
    });
    return articlesRender;
  }

  componentDidMount() {
    smashRequests.getArticlesFromMeAndFriends(authRequests.getCurrentUid())
      .then((articlesArray) => {
        this.setState({ articlesList: articlesArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='col-10'>
        <h3 className='articleTitle'>Articles</h3>
        <div>{this.articlesBuilder()}</div>
      </div>
    );
  }
}

export default articles;
