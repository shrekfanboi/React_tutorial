import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";



function RenderDish({dish}){
    if(dish != null){
        return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle style={{fontWeight:"bold"}}>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}



function RenderComments({dish}){
    if(dish != null){
        const cmts = dish.comments.map(comment =>{
            return (
                <ul className="list-unstyled">
                    <li key={comment.id}>
                        <p> {comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(comment.date))}
                        </p>
                    </li>
                </ul>
            );
        })
        return (
            <div className="col-12 col-md-5 m-1">
            <h4> Comments </h4>
                {cmts}
            </div>
        );
    }
    else{
        return (
            <div ></div>
        );
    }
}

const DishDetails = (props) => {
    return (
        <div className="container">
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments dish={props.dish} />
            </div>
        </div>
        );
}

export default DishDetails;