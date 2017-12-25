import React, { Component } from 'react';
import { Divider, List, Grid, Container, Segment, Step, Form, TextArea, Button } from 'semantic-ui-react'
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      activeItem: 'home',
      activeStep: 'paste',
      input: '',
      output: [],
      bullets: true,
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toNumbers = this.toNumbers.bind(this);
    this.toBullets = this.toBullets.bind(this);
    this.handleReverse = this.handleReverse.bind(this);

  }
  
  handleMenuClick = (e, { name }) => this.setState({ activeItem: name })
  handleStepClick = (e, { name }) => this.setState({ activeStep: name })

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = this.state.input.trim();
    const output = input.split("\n").reverse();
    this.setState({
      'output': output,
    })
  }

  toNumbers() {
    const output = this.state.output;
    
    let output_numbered = [];
    for(let i = 0; i < output.length; i++) {
      output_numbered.push((i+1).toString() + " " + output[i]);
    }

    this.setState({
      'output': output_numbered,
    })

  }

  toBullets() {
    const output = this.state.output;

    let output_bullets = [];

    for(let i = 0; i < output.length; i++) {
      let item_bullet = output[i].split(" ").slice(1).join(" ")
      
      output_bullets.push(item_bullet)
    }
    this.setState({
      'output': output_bullets,
    })
  }

  handleReverse() {
    const output_reverse = this.state.output.reverse()
    this.setState({
      'output': output_reverse,
    })
  }

  render() {

    return (
      <div className="App">
        {/* <Menu pointing secondary>
          <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleMenuClick} />
          <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleMenuClick} />
          <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleMenuClick} />
          <Menu.Menu position='right'>
            <Menu.Item name='logout' active={this.activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu> */}
        <Grid container stackable centered columns={2}>
          <Grid.Row>
            <h1>Reverse my list</h1>
          </Grid.Row>
          <Grid.Column>
            <Segment raised clearing>
              <h2>Input</h2>
              <Form>
                <TextArea name="input" placeholder='Paste a list in here' style={{ minHeight: 200 }} onChange={this.handleChange} />
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised clearing>
              <h2>Output</h2>
              <List items={this.state.output} />
              <Button.Group floated="left" onClick={() => {this.setState({bullets: !this.state.bullets})}}>
                <Button positive={this.state.bullets} onClick={this.toBullets}>Bullets</Button>
                <Button.Or />
                <Button positive={!this.state.bullets} onClick={this.toNumbers}>Numbers</Button>
              </Button.Group>
              <Button floated="right" onClick={this.handleReverse}>Reversed</Button>
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider hidden />
        <Container>
          <Step.Group fluid stackable='tablet'>
            <Step active={this.state.activeStep === 'paste'} onClick={this.handleStepClick}  title='Paste' description='Paste your list on the left' />
            <Step active={this.state.activeStep === 'convert'} onClick={this.handleSubmit}  title='Convert' description='Click me to convert your list' />
            <Step active={this.state.activeStep === 'copy'} onClick={this.handleStepClick}  title='Copy' description='Copy your new list back to your application' />
          </Step.Group>
        </Container>
      </div>
    );
  }
}

export default App;
