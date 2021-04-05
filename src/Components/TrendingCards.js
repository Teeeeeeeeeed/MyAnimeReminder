import React from 'react';
import {Card, Button} from 'react-bootstrap';
import image from '../img/Attackontitan.png'
import {Container, Row,Col } from 'react-bootstrap';

const TrendingCards =() => {
    const cardInfo = [
        { img:image,anime_id:'1', text:'sample text', rank:'1',anime_name:'Attack on titan'},
        { img:image,anime_id:'2', text:'sample text', rank:'2',anime_name:'Demon Slayer'},
        { img:image,anime_id:'3', text:'sample text', rank:'3',anime_name:'Fruits Basket'},
        { img:image,anime_id:'4', text:'sample text', rank:'4',anime_name:'Quintessential Quintuplets'},
        { img:image,anime_id:'5', text:'sample text', rank:'5',anime_name:'Jujutsu Kaisen'},
    ]
const renderCard = (card,index) => {
return(
<Card style={{width:'60%', height:'10%'}} border='dark' className='TrendCards'>
    <Card.Img variant="top" src={card.img} className='TrendCardsImg'/>
    <Container>
        <Card.Body className='text'>
            <Row>
                <Col>
                    <Card.Title style={{height:'14px'}}>{card.anime_name}</Card.Title>
                    <Card.Text>
                        {card.text}
                    </Card.Text>
                </Col>
                <Col md='2' sm='1'>
                    <h1 className='text'>{card.rank}</h1>
                </Col>
            <Button variant="primary">Add to Calender</Button>
            </Row>
        </Card.Body>
    </Container>
</Card>
    )
}
return <div>{cardInfo.map(renderCard)}</div>
}
export default TrendingCards;