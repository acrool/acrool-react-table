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

export interface IPage {
    currentPage: number,
    pageLimit?: number,
}
export interface IOrder {
    orderField: string,
    orderBy: 'DESC'|'ASC',
}

export interface IPaginateMeta extends Required<IPage> {
    order?: IOrder,
}

export type TOnChangePage = (meta: IPaginateMeta, isUsePreMeta?: boolean) => void
export type TOnChangeSortField = (meta: IOrder) => void
