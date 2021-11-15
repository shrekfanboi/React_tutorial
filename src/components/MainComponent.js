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

import { Switch, Route, Redirect } from 'react-router-dom';

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


  render() {
    const Homepage = () => {
      return (
      <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
      leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId = ({match}) => {
      console.log(this.state.comments)
      return(
          <DishDetails dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    }

    const AboutUs = () => {
      return (
        <About leaders={this.state.leaders} />
      );
    }

    return (
      <div>
        <Header/>
          <Switch>
            <Route path='/home' component={Homepage} />
            <Route exact path="/menu" component={() => <Menu dish={this.state.dishes}/>}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path="/contactus" component={Contact}/>
            <Route exact path = "/aboutus" component={AboutUs}/>
            <Redirect to="/home" />
          </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;