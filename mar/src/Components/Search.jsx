import React from 'react';
import {Form,Row,Col,Container, Button} from 'react-bootstrap';
import {MyContext} from '../MyContext';
import axios from 'axios';
import loader from './loader.svg';

const Axios = axios.create({
    baseURL:'http://localhost/MAR/api/anime/'
});

class Search extends React.Component {
    constructor(props) {
        super();
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            alertMessage:'',
            alert:false
        }
        this.cancel = '';
        this.userEmail = props
        this.status = 1;
    }
    

    onInputChange = (event) => {
        const query2 = event.target.value;
        const name = event.target.name;
        this.setState({query: query2, loading:true,message:''}, ()=>{
            this.fetchSearchResults(1, query2.replace(/\s/g,'%20'))
        });
    }

    addToCalender = (data) => {
        data.userEmail=this.userEmail;
        this.setState({loading:true});
        const msg =  this.sendToDatabase(data)
        msg.then(res=>{
            this.setState({alertMessage:res.data.message,loading:false});
            this.alertBox();
        }
        );
    }
    sendToDatabase = async (data) =>{
        const add = await Axios.post('anime.php',data);
        return add;
    }
    alertBox = () => {
        const alert = !this.state.alert;
        this.setState({alert:alert});
        console.log(this.alert)
    }
    renderSearchResults = () => {
        console.log(this.state.results.data);
        if (Object.keys(this.state.results).length>0){
        return(
            <div>
                {this.state.results.data.map( result =>{
                    return (
                        <Row className='search'>
                            <Col md={1} className='search-img-container'>
                                <img src={result.attributes.posterImage.large} class='search-img'/>
                            </Col>
                            <Col>
                                <Row>
                                <h1>{result.attributes.canonicalTitle}</h1>
                                {result.attributes.description}
                                </Row>
                            </Col>
                            <Col md={2}>
                            <Button className='search-img'onClick={() => this.addToCalender(result)}> Add to Calender</Button>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        )
    }
        }
    

    fetchSearchResults = (updatedPageNo='', query) =>{
        const pageNumber = updatedPageNo ? '&page='+updatedPageNo : '';
        const searchUrl = `https://kitsu.io/api/edge/anime?filter[text]=${query}`;
        console.log(searchUrl)

        if (this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();

        axios.get( searchUrl , {
            cancelToken: this.cancel.token
        })
            .then( res => {
                const resultNotFoundMsg = ! res.data.data.length 
                                          ? 'There are no more search results'
                                          : '';
                this.setState({
                    results: res.data,
                    message:resultNotFoundMsg,
                    loading:false
                })
            })
            .catch(error =>{
                if (axios.isCancel(error)||error){
                    this.setState({
                        loading:true,
                    })
                }
            })
    }

    render() {
        const { query,loading, message } = this.state
        return (
            <Container className='search-container text'>
                <Row >
                    <label className='search-label' htmlFor='search-input'>
                    <h1>Live Search: Anime</h1>
                        <input 
                        type='text'
                        id='search-input'
                        value={query}
                        placeholder='search'
                        name='query'
                        onChange={this.onInputChange}>
                        </input>
                    </label>
                    {message && <p className='message'> { message } </p>}
                    
                </Row>
                <img src={loader} className={`search-loading ${ loading ? 'show ' : 'hide'}`}/>
                <div className='scroll' data-simplebar>
                    {this.renderSearchResults()}
                </div>
                    <Container className={`alert text ${this.state.alert ? 'show' : 'hide'}`}>
                        <Row className='justify-content-md-center'>
                            <h1>
                            {this.state.alertMessage}
                            </h1>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs lg='2'>
                            <Button className='justify-content-md-center' onClick={()=>this.alertBox()}>
                                OK
                            </Button>
                            </Col>
                        </Row>
                    </Container>
            </Container>
            
        )
    }

}
export default Search