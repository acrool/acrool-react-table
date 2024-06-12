import {ReactNode} from 'react';


interface IPageButtonArgs {
    className: string,
    key: string,
    'data-active'?: string,
    onClick: () => void
    disabled: boolean,
    children: ReactNode
}

export interface IPaginateVisibleProps {
    isVisiblePageInfo?: boolean;
    isVisiblePageLimit?: boolean;
    isVisiblePagePicker?: boolean
    nextPageText?: ReactNode
    prevPageText?: ReactNode
    renderPageButton?: (args: IPageButtonArgs) => ReactNode
}
