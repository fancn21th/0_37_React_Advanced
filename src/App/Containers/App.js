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

class Toggle extends React.Component {
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
        const {on} = this.state
        return (
            <Switch on={on} onClick={this.toggle} />
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
        />
    </div>
)

export default App
