import { User } from 'firebase';
import * as _ from 'lodash';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as auth from './service';



export type FnOnLogin = (email: string, password: string) => void;

export interface ILoginFormProps {
  styles: any;
  goToRegister: () => void;
  successRoute: string;
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
    const styles = this.props.styles;
    
    if (this.state.error.message !== '') {
      errorDisplay = (<p>{this.state.error.message}</p>);
    }

    return (
      <div className={styles['auth-form']}>
        <h1>Log in</h1>
        <form onSubmit={this.__handleSubmit} method="POST">
          { errorDisplay }

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
              name="password"
              placeholder="Password"
              value={this.state.form.password}
              onChange={this.__handleInputChange} />
          </div>

          <div className={styles['input-field']}>
            <input type="submit" value="Log In" />
          </div>

          <div className={styles['input-field']}>
            <p>
              Don't have an account?&nbsp;
              <a href="#" onClick={this.__handleClickRegister}>Register here</a>.
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
      <Redirect to={this.props.successRoute} />
    );
  }



  private __handleLoginChange(user: User | null) {
    if (user !== null) {
      this.setState({
        status: 'loggedIn'
      });
    }
  }



  private __handleClickRegister(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    this.props.goToRegister();
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