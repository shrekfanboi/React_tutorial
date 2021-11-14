import React,{ Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


class Menu extends Component {
    

    onSelectDish(dish){
        console.log(dish)
        this.setState({
            selectedDish:dish
        })
    }

    

    

    render(){
        const menu = this.props.dishes.map((dish) => {
            return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                        onClick={() => this.props.onClick(dish.id)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name}/>
                  <CardImgOverlay>
                    <CardTitle style={{fontWeight:"bold"}}>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
            </div>
            );
        })
        return (
            <div className="container">
            <div className="row">
                {menu}
            </div>
          </div>
        );
    }
}

export default Menu;