import * as _ from 'lodash';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as auth from './service';

import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

const defaultStyles = require('./styles/auth.module.css');



export interface IAuthWidgetProps {
  status?: string;
  successRoute: string;
  styles?: any;
}

export interface IAuthWidgetState {
  status: string;
  loginError: {
    code: string;
    message: string;
  };
}

export class AuthWidget extends React.Component<IAuthWidgetProps, IAuthWidgetState> {

  private __removeLoginChangeListener: (() => void) | null;
  private __styles: any = defaultStyles;

  constructor(props: IAuthWidgetProps) {
    super(props);

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
    this.__removeLoginChangeListener = () => {};
  }


  
  public componentDidMount() {
    this.__removeLoginChangeListener = auth.addLoginChangeListener(this.__onLoginChange.bind(this));
  }



  public componentWillUnmount() {
    if (this.__removeLoginChangeListener) {
      this.__removeLoginChangeListener();
    }

    return;
  }



  private __onLoginChange(user: any) {
    if (user) {
      this.setState({
        status: 'loginComplete'
      });
    
    } else if(!user && this.state.status !== 'registrationForm') {
      this.setState({
        status: 'loginForm'
      });
    }
  }



  public goToLogin() {
    this.setState({ status: 'loginForm' });
  }



  public goToRegister() {
    this.setState({ status: 'registrationForm' });
  }



  public render() {
    if (this.state.status === 'loginForm') {
      return (
        <LoginForm
          styles={this.__styles}
          goToRegister={this.goToRegister}
          successRoute={this.props.successRoute} />
      );

    } else if (this.state.status === 'registrationForm') {
      return (
        <RegistrationForm
          styles={this.__styles}
          goToLogin={this.goToLogin}
          successRoute={this.props.successRoute} />
      );

    } else if (this.state.status === 'loginComplete') {
      return <Redirect to={this.props.successRoute} />;
    
    } else {
      return (
        <p>Unknown error.</p>
      );
    }
  }
}
