import * as React from 'react';
export declare type FnOnLogin = (email: string, password: string) => void;
export interface ILoginFormProps {
    styles: any;
    goToRegister: () => void;
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
export declare class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
    private __removeLoginChangeListener;
    constructor(props: ILoginFormProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private __showForm;
    private __submittingData;
    private __loggedIn;
    private __handleLoginChange;
    private __handleClickRegister;
    private __handleSubmit;
    private __handleInputChange;
}
export {};
