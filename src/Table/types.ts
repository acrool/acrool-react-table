import {ReactNode} from 'react';

export type sizeUnit = 'px' | '%' | 'em';
export type TCol = true|number|`${number}${sizeUnit}`;

export interface IData {
    id: number,
    [field: string]: any,
    appendData?: string|number|ReactNode,
    disabled?: boolean,
    onClickRow?: () => void,
}

export type TDataFooterContent = React.ReactElement;

export interface ITitle {
    className?: string,
    field: string,
    text: string|number|ReactNode,
    col: TCol,
    titleAlign?: 'left'|'center'|'right',
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
    isEnableSort?: boolean,
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
    sort?: {field: string, orderBy: 'DESC'|'ASC'}
}


// export interface ICardMeta extends IPaginateMeta {
//     sortField?: string,
//     sortBy?: 'DESC'|'ASC',
// }
