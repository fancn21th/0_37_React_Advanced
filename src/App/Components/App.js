import React from 'react'
import PropTypes from 'prop-types'
import './Styles/AppStyle.css';

/* ---------------------------------------------------- */

function Switch({on, className = '', ...props}) {
    return (
        <div className="toggle">
            <input
                className="toggle-input"
                type="checkbox"
            />
            <button
                className={`${className} toggle-btn ${on
                    ? 'toggle-btn-on'
                    : 'toggle-btn-off'}`}
                aria-expanded={on}
                {...props}
            />
        </div>
    )
}

/* ---------------------------------------------------- */

const TOGGLE_CONTEXT = '__toggle__'
function ToggleOn({children}, context) {
    const {on} = context[TOGGLE_CONTEXT]
    return on ? children : null
}
ToggleOn.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}
function ToggleOff({children}, context) {
    const {on} = context[TOGGLE_CONTEXT]
    return on ? null : children
}
ToggleOff.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}
function ToggleButton(props, context) {
    const {on, toggle} = context[TOGGLE_CONTEXT]
    return (
        <Switch on={on} onClick={toggle} {...props} />
    )
}
ToggleButton.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}

/* ---------------------------------------------------- */

function withToggle(Component) {
    function Wrapper(props, context) {
        const toggleContext = context[TOGGLE_CONTEXT]
        return (
            <Component {...toggleContext} {...props} />
        )
    }
    Wrapper.contextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
    }
    return Wrapper
}

const MyToggle = withToggle(({on, toggle}) => (
    <div>
        <button onClick={toggle}>
            {on ? 'on' : 'off'}
        </button>
    </div>
))

/* ---------------------------------------------------- */

class Toggle extends React.Component {
    static On = ToggleOn
    static Off = ToggleOff
    static Button = ToggleButton
    static defaultProps = {onToggle: () => {}}
    static childContextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
    }
    state = {on: false}
    toggle = () =>
        this.setState(
            ({on}) => ({on: !on}),
            () => {
                this.props.onToggle(this.state.on)
            },
        )
    getChildContext() {
        return {
            [TOGGLE_CONTEXT]: {
                on: this.state.on,
                toggle: this.toggle,
            },
        }
    }
    render() {
        return <div>{this.props.children}</div>
    }
}

/* ---------------------------------------------------- */

const App = () => (
    <div style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    }}>
        <Toggle
            onToggle={on => console.log('toggle', on)}
        >
            <Toggle.On>The button is on</Toggle.On>
            <Toggle.Button />
            <hr />
            <MyToggle />
            <Toggle.Off>The button is off</Toggle.Off>
        </Toggle>
    </div>
)

export default App
