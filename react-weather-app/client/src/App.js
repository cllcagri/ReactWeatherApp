import React, {Component} from 'react';
import {Container, Navbar, NavbarBrand, Row, Col, Jumbotron, InputGroup, Input, Button,InputGroupAddon,FormGroup} from 'reactstrap';
import Weather from "./Weather";



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            weather: null,
            cityList: [],
            newCityName: '',
        };
    }

    getCityList = () => {
        fetch('/api/cities')
            .then(res => res.json())
            .then(res => {
                let cityList = res.map(r => r.city_name);
                this.setState({cityList : cityList})
            });
    };

    handleInputChange = (e) => {
        this.setState({newCityName : e.target.value});
    };

    handleAddCity = () => {
       fetch('/api/cities', {
           method:  'post',
           headers: {'Content-type' : 'application/json'},
           body: JSON.stringify({city: this.state.newCityName})
       }).then(res => res.json)
           .then(res => {
               this.getCityList();
               this.setState({newCityName: ''});
           });
    };

    getWeather = (city) => {
        fetch(`/api/weather/${city}`)
            .then(res => res.json())
            .then(weather => {
                if (weather.error != null){
                    weather.error.message = 'Please enter a valid City';
                    this.setState({weather : weather});
                }else {
                    console.log(weather);
                    this.setState({weather : weather});
                }
            });
    };

    componentDidMount() {
        this.getCityList();
    }

    handleChangeCity = (e) => {
        console.log(e.target.value);
        this.getWeather(e.target.value);
    };

    render() {
        return(
            <Container fluid className="centered">
                <Navbar dark color="dark">
                    <NavbarBrand href="/">My Weather App</NavbarBrand>
                </Navbar>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1 className="display-3">MyWeather</h1>
                            <p className="lead">The current weather for your favourite cities!</p>
                            <InputGroup>
                                <Input  placeholder="New city name..."
                                        value={this.state.newCityName}
                                        onChange={this.handleInputChange}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="display-5">Current Weather</h1>
                        <FormGroup>
                            <Input type="select" onChange={this.handleChangeCity}>
                                {this.state.cityList.length === 0 && <option> No cities added yet.</option>}
                                {this.state.cityList.length > 0 && <option> Select a city.</option>}
                                {this.state.cityList.map((city,i) => <option key={i}>{city}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Weather data={this.state.weather}/>
            </Container>
        );
    }
}

export default App;
