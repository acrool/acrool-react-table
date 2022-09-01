import {ReactNode} from 'react';

export type sizeUnit = 'px' | '%' | 'em';
export type TCol = true|number|`${number}${sizeUnit}`;

interface IField {
    [field: string]: string | number | JSX.Element;
}

export interface IData {
    id: number,
    appendData?: string|number|JSX.Element,
    disabled?: boolean,
    onClickRow?: () => void,
    field: IField
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
    pageLimit?: number,
    orderField?: string,
    orderBy?: 'DESC'|'ASC'
}
export type TPaginateMeta = Required<IPage> & Partial<IOrder>;

export interface IPage {
    currentPage: number,
    pageLimit?: number,
}
export interface IOrder {
    orderField: string,
    orderBy: 'DESC'|'ASC',
}

export interface TMeta extends Required<IPage> {
    order?: IOrder,
}

export type TChangePage = (pageMeta: Required<IPage>) => void
export type TOnChangePage = (meta: TMeta) => void
// export type TOnChangePage = (pageMeta: IPage, orderMeta?: IOrder) => void
export type TOnChangeSortField = (meta: IOrder) => void
