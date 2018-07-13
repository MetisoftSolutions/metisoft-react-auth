import { User } from '@firebase/auth-types';
import * as _ from 'lodash';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as auth from './service';



export type FnOnLogin = (email: string, password: string) => void;

export interface ILoginFormProps {
}

interface ILoginFormState {
  status: string;
  error: {
    code: string;
    message: string;
  };
  form: {
    email: string;
    password: string;
  };
}

export class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {

  private __removeLoginChangeListener: (() => void) | null = null;

  constructor(props: ILoginFormProps) {
    super(props);

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



  public componentDidMount() {
    this.__removeLoginChangeListener = auth.addLoginChangeListener(this.__handleLoginChange.bind(this));
  }



  public componentWillUnmount() {
    if (this.__removeLoginChangeListener !== null) {
      this.__removeLoginChangeListener();
      this.__removeLoginChangeListener = null;
    }
  }



  public render() {
    if (this.state.status === 'showForm') {
      return this.__showForm();

    } else if (this.state.status === 'submittingData') {
      return this.__submittingData();
    
    } else if (this.state.status === 'loggedIn') {
      return this.__loggedIn();
    }

    return (
      <div>Unknown error.</div>
    );
  }



  private __showForm() {
    let errorDisplay: JSX.Element | null = null;
    
    if (this.state.error.message !== '') {
      errorDisplay = (<p>{this.state.error.message}</p>);
    }

    return (
      <div className="auth-form">
        <h1>Log in</h1>
        <form onSubmit={this.__handleSubmit} method="POST">
          { errorDisplay }

          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={this.state.form.email}
              onChange={this.__handleInputChange} />
          </div>

          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.form.password}
              onChange={this.__handleInputChange} />
          </div>

          <div className="input-field">
            <input type="submit" value="Log In" />
          </div>

          <div className="input-field">
            <p>
              Don't have an account?&nbsp;
              <Link to="/auth/register">Register here</Link>.
            </p>
          </div>
        </form>
      </div>
    );
  }



  private __submittingData() {
    return (
      <div className="auth-form">
        Logging in...
      </div>
    );
  }



  private __loggedIn() {
    return (
      <Redirect to="/auth/success" />
    );
  }



  private __handleLoginChange(user: User | null) {
    if (user !== null) {
      this.setState({
        status: 'loggedIn'
      });
    }
  }



  private __handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
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
  }



  private __handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const form = _.cloneDeep(this.state.form);
    form[event.target.name] = event.target.value;
    this.setState({form});
  }

}