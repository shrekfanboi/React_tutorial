import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetails from './DishDetails';
import { DISHES } from './shared/dishes';
import { COMMENTS } from './shared/comments';
import { PROMOTIONS } from './shared/promotions';
import { LEADERS } from './shared/leaders';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos,postComment,fetchLeaders,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),

  
});


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders()
  }


  render() {
    const Homepage = () => {
      return (
      <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
      dishesLoading={this.props.dishes.isLoading}
      dishesErrMess={this.props.dishes.errMess}
      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
      promoLoading={this.props.promotions.isLoading}
      promoErrMess={this.props.promotions.errMess}
      leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
      leaderLoading={this.props.leaders.isLoading}
      leaderErrMess={this.props.leaders.errMess}/>

      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment} />
      );
    }

    const AboutUs = () => {
      return (
        <About leaders={this.props.leaders.leaders}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess} />
      );
    }

    return (
      <div>
        <Header/>

        <Switch location={this.props.location}>
              <Route path='/home' component={Homepage} />
              <Route exact path="/menu" component={() => <Menu dish={this.props.dishes}/>}/>
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
              <Route exact path = "/aboutus" component={AboutUs}/>
              <Redirect to="/home" />
            </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));