import * as React from 'react';
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
export declare class RegistrationForm extends React.Component<IRegistrationFormProps, IRegistrationFormState> {
    private __removeLoginChangeListener;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private __showForm;
    private __handleSubmit;
    private __handleInputChange;
    private __handleLoginChange;
    private __handleClickLogIn;
    private __submittingData;
    private __complete;
}
export {};
