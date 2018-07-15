import * as React from 'react';
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
export declare class AuthWidget extends React.Component<IAuthWidgetProps, IAuthWidgetState> {
    private __removeLoginChangeListener;
    private __styles;
    constructor(props: IAuthWidgetProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private __onLoginChange;
    goToLogin(): void;
    goToRegister(): void;
    render(): JSX.Element;
}
