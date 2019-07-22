"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const auth = require("./service");
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.__removeLoginChangeListener = null;
        this.__handleSubmit = (event) => {
            this.setState({
                status: 'submittingData'
            });
            auth.register(this.state.form.email, this.state.form.password1)
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
        this.__handleLoginChange = (user) => {
            if (user !== null) {
                this.setState({
                    status: 'complete'
                });
            }
        };
        this.__handleClickLogIn = this.__handleClickLogIn.bind(this);
        this.state = {
            status: 'showForm',
            error: {
                code: '',
                message: ''
            },
            form: {
                email: '',
                password1: '',
                password2: ''
            }
        };
    }
    componentDidMount() {
        this.__removeLoginChangeListener = auth.addLoginChangeListener(this.__handleLoginChange);
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
        else if (this.state.status === 'complete') {
            return this.__complete();
        }
        else {
            return (React.createElement("p", null, "Unknown error."));
        }
    }
    __showForm() {
        let errorDisplay = null;
        const styles = this.props.styles;
        if (this.state.error.message !== '') {
            errorDisplay = (React.createElement("p", null, this.state.error.message));
        }
        return (React.createElement("div", { className: styles['auth-form'] },
            React.createElement("h1", null, "Register a new account"),
            React.createElement("form", { onSubmit: this.__handleSubmit, method: "POST" },
                errorDisplay,
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("input", { type: "email", name: "email", placeholder: "Email address", value: this.state.form.email, onChange: this.__handleInputChange })),
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("input", { type: "password", name: "password1", placeholder: "Password", value: this.state.form.password1, onChange: this.__handleInputChange })),
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("input", { type: "password", name: "password2", placeholder: "Confirm password", value: this.state.form.password2, onChange: this.__handleInputChange })),
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("input", { type: "submit", value: "Register" })),
                React.createElement("div", { className: styles['input-field'] },
                    React.createElement("p", null,
                        "Already have an account?\u00A0",
                        React.createElement("a", { href: "#", onClick: this.__handleClickLogIn }, "Log in here"),
                        ".")))));
    }
    __handleClickLogIn(event) {
        event.preventDefault();
        this.props.goToLogin();
    }
    __submittingData() {
        return (React.createElement("div", { className: "auth-form" }, "Submitting data..."));
    }
    __complete() {
        return (React.createElement(react_router_dom_1.Redirect, { to: this.props.successRoute }));
    }
}
exports.RegistrationForm = RegistrationForm;
//# sourceMappingURL=RegistrationForm.js.map