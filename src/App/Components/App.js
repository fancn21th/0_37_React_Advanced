import React from 'react'
import './Styles/AppStyle.css';

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

function ToggleOn({on, children}) {
    return on ? children : null
}
function ToggleOff({on, children}) {
    return on ? null : children
}
function ToggleButton({on, toggle, ...props}) {
    return (
        <Switch on={on} onClick={toggle} {...props} />
    )
}

class Toggle extends React.Component {
    static On = ToggleOn
    static Off = ToggleOff
    static Button = ToggleButton
    static defaultProps = {onToggle: () => {}}
    state = {on: false}
    toggle = () =>
        this.setState(
            ({on}) => ({on: !on}),
            () => {
                this.props.onToggle(this.state.on)
            },
        )
    render() {
        const children = React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
                on: this.state.on,
                toggle: this.toggle,
            })
        )
        return (
            <div>{children}</div>
        )
    }
}

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
            <Toggle.Off>The button is off</Toggle.Off>
            <Toggle.Button />
        </Toggle>
    </div>
)

export default App
