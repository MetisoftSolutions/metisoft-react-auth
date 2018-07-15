"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const auth = require("./service");
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.__removeLoginChangeListener = null;
        this.__handleSubmit = (event) => {
            this.setState({
                status: 'submittingData'
            });
            auth.logIn(this.state.form.email, this.state.form.password)
                .catch((err) => {
                this.setState({
                    error: err,
                    status: 'showForm'
                });
            });
            event.preventDefault();
        };
        this.__handleInputChange = (event) => {
            const form = _.cloneDeep(this.state.form);
            form[event.target.name] = event.target.value;
            this.setState({ form });
        };
        this.__handleClickRegister = this.__handleClickRegister.bind(this);
        this.state = {
            status: 'showForm',
            error: {
                code: '',
                message: ''
            },
            form: {
                email: '',
                password: ''
            }
        };
    }
    componentDidMount() {
        this.__removeLoginChangeListener = auth.addLoginChangeListener(this.__handleLoginChange.bind(this));
    }
    componentWillUnmount() {
        if (this.__removeLoginChangeListener !== null) {
            this.__removeLoginChangeListener();
            this.__removeLoginChangeListener = null;
        }
    }
    render() {
        if (this.state.status === 'showForm') {
            return this.__showForm();
        }
        else if (this.state.status === 'submittingData') {
            return this.__submittingData();
        }
        else if (this.state.status === 'loggedIn') {
            return this.__loggedIn();
        }
        return (React.createElement("div", null, "Unknown error."));
    }
    __showForm() {
        let errorDisplay = null;
        const styles = this.props.styles;
        if (this.state.error.message !== '') {
            errorDisplay = (React.createElement("p", null, this.state.error.message));
        }
        return (React.createElement("div", { className: styles['auth-form'] },
            React.createElement("h1", null, "Log in"),
            React.createElement("form", { onSubmit: this.__handleSubmit, method: "POST" },
                errorDisplay,
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("input", { type: "email", name: "email", placeholder: "Email address", value: this.state.form.email, onChange: this.__handleInputChange })),
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("input", { type: "password", name: "password", placeholder: "Password", value: this.state.form.password, onChange: this.__handleInputChange })),
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("input", { type: "submit", value: "Log In" })),
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("p", null,
                        "Don't have an account?\u00A0",
                        React.createElement("a", { href: "#", onClick: this.__handleClickRegister }, "Register here"),
                        ".")))));
    }
    __submittingData() {
        return (React.createElement("div", { className: "auth-form" }, "Logging in..."));
    }
    __loggedIn() {
        return (React.createElement(react_router_dom_1.Redirect, { to: this.props.successRoute }));
    }
    __handleLoginChange(user) {
        if (user !== null) {
            this.setState({
                status: 'loggedIn'
            });
        }
    }
    __handleClickRegister(event) {
        event.preventDefault();
        this.props.goToRegister();
    }
}
exports.LoginForm = LoginForm;
//# sourceMappingURL=LoginForm.js.map