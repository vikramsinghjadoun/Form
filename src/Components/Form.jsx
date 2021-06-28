import React from 'react';
import './Form.css';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      age: '',
      gender: 'Select',
      number: '',
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdChange = event => {
    this.setState({ id: event.target.value });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleAgeChange = event => {
    this.setState({ age: event.target.value });
  };

  handleGenderChange = event => {
    this.setState({ gender: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ number: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const users = [];
    let allUser = JSON.parse(localStorage.getItem('emp'));
    if (allUser) {
      const getUser = allUser.find(obj => obj.id === this.state.id);
      if (getUser) {
        return alert('Account exist');
      }
      allUser.map(user => users.push(user));
    }
    users.push(this.state);
    localStorage.setItem('emp', JSON.stringify(users));
    // this.props.history.push('/');
  }
  Reset = () => {
    this.setState({ id: '', name: '', age: '', gender: 'Select', number: '' });
  };

  render() {
    const { id, name, age, gender, number } = this.state;
    return (
      <>
        <header className='heading'>Employee Form</header>
        <div className='set '>
          <form onSubmit={this.handleSubmit}>
            <div className='input-div'>
              <label>Employee Id</label>
              <input
                type='number'
                required
                defaultValue={id}
                onChange={this.handleIdChange}
              />
            </div>
            <div className='input-div'>
              <label>Full Name</label>
              <input
                type='text'
                required
                defaultValue={name}
                onChange={this.handleNameChange}
              />
            </div>
            <div className='input-div'>
              <label>Age</label>
              <input
                type='number'
                required
                defaultValue={age}
                onChange={this.handleAgeChange}
              />
            </div>
            <div className='input-div'>
              <label>Gender</label>
              <select
                className='select'
                defaultValue={gender}
                onChange={this.handleGenderChange}
              >
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className='input-div'>
              <label>Contact Number</label>
              <input
                type='tel'
                pattern='[0-9]{10}'
                required
                value={number}
                onChange={this.handleNumberChange}
              />
            </div>
            <div className='button-div'>
              <input
                type='reset'
                className='btn'
                value='Reset'
                onClick={() => {
                  this.Reset();
                }}
              />
              <input className='btn' type='submit' value='Submit' />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Form;
