import {ReactNode} from 'react';

export interface IData {
    id: number,
    [field: string]: any,
    appendData?: any,
    disabled?: boolean,
    onClickRow?: () => void,
}

export type TFooterData = React.ReactElement;

export interface ITitle {
    field: string,
    text: string|number|ReactNode,
    col?: number|true,
    width?: number,
    titleAlign?: 'left'|'center'|'right',
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
    className?: string,
    isSort?: boolean,
    sortBy?: 'DESC'|'ASC',
}



export interface IPaginationRes<T> {
    rows: T[],
    meta: IPaginateMeta,
    info: IPaginateInfo,
}

export interface IPaginateInfo {
    totalItems: number,
    totalPages: number,
}

export interface IPaginateMeta {
    currentPage: number,
    pageLimit: number,
    sortField?: string,
    sortBy?: 'DESC'|'ASC',
}


export interface ICardMeta extends IPaginateMeta {
    sortField?: string,
    sortBy?: 'DESC'|'ASC',
}
