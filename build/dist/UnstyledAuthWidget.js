"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const auth = require("./service");
const LoginForm_1 = require("./LoginForm");
const RegistrationForm_1 = require("./RegistrationForm");
class UnstyledAuthWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status || 'loginForm',
            loginError: {
                code: '',
                message: ''
            }
        };
        this.__removeLoginChangeListener = () => { };
    }
    componentDidMount() {
        this.__removeLoginChangeListener = auth.addLoginChangeListener(this.__onLoginChange.bind(this));
    }
    componentWillUnmount() {
        if (this.__removeLoginChangeListener) {
            this.__removeLoginChangeListener();
        }
        return;
    }
    __onLoginChange(user) {
        if (user) {
            this.setState({
                status: 'loginComplete'
            });
        }
        else if (!user && this.state.status !== 'registrationForm') {
            this.setState({
                status: 'loginForm'
            });
        }
    }
    render() {
        if (this.state.status === 'loginForm') {
            return React.createElement(LoginForm_1.LoginForm, null);
        }
        else if (this.state.status === 'registrationForm') {
            return React.createElement(RegistrationForm_1.RegistrationForm, null);
        }
        else if (this.state.status === 'loginComplete') {
            return React.createElement(react_router_dom_1.Redirect, { to: this.props.successRoute });
        }
        else {
            return (React.createElement("p", null, "Unknown error."));
        }
    }
}
exports.UnstyledAuthWidget = UnstyledAuthWidget;
//# sourceMappingURL=UnstyledAuthWidget.js.map