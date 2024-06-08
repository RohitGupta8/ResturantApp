import {Card, Button} from "react-bootstrap"
import veg from '../../images/veg.png'
import nonveg from '../../images/nonveg.png'

const DishesCardComponent = (props) => {
    return (
        <div>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={props.value.image} />
                <Card.Body style={{background:'dark yellow'}}>
                    <Card.Title>{props.value.name}</Card.Title>
                    <Card.Subtitle>Rs. {props.value.price}</Card.Subtitle>
                    <Card.Text>{props.value.type === 'veg' ? ( <img alt="" src={veg} height='20px' width='20px' style={{marginTop:'5px'}} ></img>):(<img alt="" style={{marginTop:'5px'}} src={nonveg} height='20px' width='20px' ></img>)}</Card.Text>
                    <Button variant="primary">Add</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default DishesCardComponent
