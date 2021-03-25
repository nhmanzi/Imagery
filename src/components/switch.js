import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
class SwitchButton extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(checked) {
    this.props.Themechanger(checked);
    this.setState({ checked });
  }

  render() {
    return (
      <Switch
        onChange={this.handleChange}
        checked={this.state.checked}
        offHandleColor='var(--clr-dark-100)'
        onHandleColor='#08f'
        activeBoxShadow='0px 0px 1px 2px #fffc35'
        uncheckedHandleIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              height: '100%',
              fontSize: 12
            }}
          >
            <FontAwesomeIcon icon={faSun} />
          </div>
        }
        uncheckedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 15,
              color: 'orange',
              paddingRight: 2
            }}
          >
            <FontAwesomeIcon icon={faMoon} />
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 15,
              color: 'orange',
              paddingRight: 2
            }}
          >
            <FontAwesomeIcon icon={faSun} />
          </div>
        }
        checkedHandleIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: 'white',
              fontSize: 18
            }}
          >
            <FontAwesomeIcon icon={faMoon} />
          </div>
        }
      />
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Themechanger: (DarkMode) =>
      dispatch({ type: 'THEME_CHANGER_REQUEST', DarkMode })
  };
};
export default connect(null, mapDispatchToProps)(SwitchButton);
