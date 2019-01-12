import React from 'react';
import './home.scss';

class home extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className='container'>
        <div className="card-deck">
          <div className="card border-dark" id='messages' onClick={this.changeView}>
            <div className="card-body text-center">
              <h5 className="card-title"><i className="fas fa-comments fa-7x"></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">Messages</h6>
              <p className="card-text">Newer better AOL</p>
            </div>
            </div>
            <div className="card border-dark" id='friends' onClick={this.changeView}>
            <div className="card-body text-center">
              <h5 className="card-title"><i className="fas fa-users fa-7x"></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">Friends</h6>
              <p className="card-text">Friend List?</p>
            </div>
            </div>
            <div className="card border-dark" id='articles' onClick={this.changeView}>
            <div className="card-body text-center">
              <h5 className="card-title"><i className="fas fa-envelope-open-text fa-7x"></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">Articles</h6>
              <p className="card-text">See your saved articles</p>
            </div>
            </div>
            <div className="card border-dark" id='events' onClick={this.changeView}>
            <div className="card-body text-center">
              <h5 className="card-title"><i className="fab fa-pied-piper-alt fa-7x"></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">Events</h6>
              <p className="card-text">Upcoming events</p>
            </div>
            </div>
            <div className="card border-dark" id='weather' onClick={this.changeView}>
            <div className="card-body text-center">
              <h5 className="card-title"><i className="fas fa-cloud-showers-heavy fa-7x"></i></h5>
              <h6 className="card-subtitle mb-2 text-muted">Weather</h6>
              <p className="card-text">What is the current weather</p>
            </div>
           </div>
        </div>
      </div>
    );
  }
}

export default home;
