import * as React from 'react';
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
export declare class UnstyledAuthWidget extends React.Component<IUnstyledAuthWidgetProps, IUnstyledAuthWidgetState> {
    private __removeLoginChangeListener;
    constructor(props: IUnstyledAuthWidgetProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private __onLoginChange;
    render(): JSX.Element;
}
export {};
