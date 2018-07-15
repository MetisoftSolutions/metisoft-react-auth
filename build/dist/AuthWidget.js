"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const auth = require("./service");
const LoginForm_1 = require("./LoginForm");
const RegistrationForm_1 = require("./RegistrationForm");
const defaultStyles = require('./styles/auth.css');
class AuthWidget extends React.Component {
    constructor(props) {
        super(props);
        this.__styles = defaultStyles;
        this.goToLogin = this.goToLogin.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
        if (this.props.styles) {
            this.__styles = _.cloneDeep(this.props.styles);
        }
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
    goToLogin() {
        this.setState({ status: 'loginForm' });
    }
    goToRegister() {
        this.setState({ status: 'registrationForm' });
    }
    render() {
        if (this.state.status === 'loginForm') {
            return (React.createElement(LoginForm_1.LoginForm, { styles: this.__styles, goToRegister: this.goToRegister }));
        }
        else if (this.state.status === 'registrationForm') {
            return (React.createElement(RegistrationForm_1.RegistrationForm, { styles: this.__styles, goToLogin: this.goToLogin }));
        }
        else if (this.state.status === 'loginComplete') {
            return React.createElement(react_router_dom_1.Redirect, { to: this.props.successRoute });
        }
        else {
            return (React.createElement("p", null, "Unknown error."));
        }
    }
}
exports.AuthWidget = AuthWidget;
//# sourceMappingURL=AuthWidget.js.map