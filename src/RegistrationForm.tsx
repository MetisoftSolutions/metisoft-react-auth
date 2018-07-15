import * as _ from 'lodash';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as auth from './service';

import { User } from '@firebase/auth-types';



interface IAuthError {
  code: string;
  message: string;
}

export interface IRegistrationFormProps {
  styles: any;
  goToLogin: () => void;
  successRoute: string;
}

export interface IRegistrationFormState {
  status: string;
  error: IAuthError;
  form: {
    email: string;
    password1: string;
    password2: string;
  };
}

export class RegistrationForm extends React.Component<IRegistrationFormProps, IRegistrationFormState> {

  private __removeLoginChangeListener: (() => void) | null = null;

  constructor(props: any) {
    super(props);

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

    } else if (this.state.status === 'complete') {
      return this.__complete();
    
    } else {
      return (
        <p>Unknown error.</p>
      );
    }
  }



  private __showForm() {
    let errorDisplay: JSX.Element | null = null;
    const styles = this.props.styles;

    if (this.state.error.message !== '') {
      errorDisplay = (<p>{this.state.error.message}</p>);
    }

    return (
      <div className={styles['auth-form']}>
        <h1>Register a new account</h1>
        <form onSubmit={this.__handleSubmit} method="POST">
          {errorDisplay}

          <div className={styles['input-field']}>
            <input 
              type="email"
              name="email"
              placeholder="Email address"
              value={this.state.form.email}
              onChange={this.__handleInputChange} />
          </div>

          <div className={styles['input-field']}>
            <input
              type="password"
              name="password1"
              placeholder="Password"
              value={this.state.form.password1}
              onChange={this.__handleInputChange} />
          </div>

          <div className={styles['input-field']}>
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={this.state.form.password2}
              onChange={this.__handleInputChange} />
          </div>

          <div className={styles['input-field']}>
            <input type="submit" value="Register" />
          </div>

          <div className={styles['input-field']}>
            <p>
              Already have an account?&nbsp;
              <a href="#" onClick={this.__handleClickLogIn}>Log in here</a>.
            </p>
          </div>
        </form>
      </div>
    );
  }



  private __handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    this.setState({
      status: 'submittingData'
    });

    auth.register(this.state.form.email, this.state.form.password1)
      .catch((err: IAuthError) => {
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



  private __handleLoginChange(user: User | null) {
    if (user !== null) {
      this.setState({
        status: 'complete'
      });
    }
  }



  private __handleClickLogIn(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    this.props.goToLogin();
  }



  private __submittingData() {
    return (
      <div className="auth-form">
        Submitting data...
      </div>
    );
  }



  private __complete() {
    return (
      <Redirect to={this.props.successRoute} />
    );
  }

}