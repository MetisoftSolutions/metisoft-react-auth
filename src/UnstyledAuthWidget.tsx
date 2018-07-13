import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as auth from './service';

import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';



interface IUnstyledAuthWidgetProps {
  status?: string;
  styleSheetFileName?: string;
  successRoute: string;
}

interface IUnstyledAuthWidgetState {
  status: string;
  loginError: {
    code: string;
    message: string;
  };
}

export class UnstyledAuthWidget extends React.Component<IUnstyledAuthWidgetProps, IUnstyledAuthWidgetState> {

  private __removeLoginChangeListener: (() => void) | null;

  constructor(props: IUnstyledAuthWidgetProps) {
    super(props);
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



  public render() {
    if (this.state.status === 'loginForm') {
      return <LoginForm />;

    } else if (this.state.status === 'registrationForm') {
      return <RegistrationForm />;

    } else if (this.state.status === 'loginComplete') {
      return <Redirect to={this.props.successRoute} />;
    
    } else {
      return (
        <p>Unknown error.</p>
      );
    }
  }
}
