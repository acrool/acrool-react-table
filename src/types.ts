import {ReactNode, MouseEvent} from 'react';
import CSS from 'csstype';

export type sizeUnit = 'px' | '%' | 'em' | 'fr';
export type TCol = true|'auto'|number|`${number}${sizeUnit}`|'min-content'|'max-content'|`minmax('${number}${sizeUnit}', '${number}${sizeUnit}')`;


export type TID = string | number;
type TFieldValue = string | number | JSX.Element;
type TFieldFunc = (args: {isActive: boolean, collapse: (event: MouseEvent) => void}) => TFieldValue;

type IField<K extends string> = {
    [P in K]: TFieldValue | TFieldFunc;
}

type IDetail<K extends string> = {
    config: {
        [P in K]?: IConfig
    },
    data: Array<{
        [P in K]?: TFieldValue;
    }>,
}

export interface IData<T extends TID, K extends string> {
    id: T,
    appendData?: string | number | JSX.Element,
    detail?: JSX.Element | IDetail<K>,
    disabled?: boolean,
    onClickRow?: () => void,
    field: IField<K>
}


export type TDataFooterContent = React.ReactElement;




export interface IConfig {
    colSpan?: number,
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
}

export interface ITitle extends IConfig {
    className?: string,
    col: TCol,
    text: string|number|ReactNode,
    titleAlign?: 'left'|'center'|'right',
    isEnableSort?: boolean,
}

// export type TTitleField<K extends string> = Record<K, ITitle>
export type TTitleField<K extends string> = {
    [P in K]?: ITitle;
}

export type IFooter<K extends string> = {
    [P in K]?: { value: TFieldValue } & IConfig;
}

// export interface IPaginationRes<T> {
//     rows: T[],
//     meta: IPaginateMeta,
//     info: IPaginateInfo,
// }

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



export interface ITableProps<T extends TID, K extends string> {
    className?: string;
    style?: CSS.Properties,
    isDark?: boolean
    isFetching?: boolean,
    title: TTitleField<K>,
    data?: IData<T, K>[],
    footer?: IFooter<K>
    gap?: string
    dataFooterContent?: TDataFooterContent, // ex: total...
    paginateInfo?: IPaginateInfo,
    paginateMeta?: IPaginateMeta,

    isVisibleHeader?: boolean,
    isStickyHeader?: boolean,
    isVisiblePaginate?: boolean,
    onChangePage?: TOnChangePage,
    pageLimitOptions?: number[];

    renderNoData?: () => JSX.Element;
}
