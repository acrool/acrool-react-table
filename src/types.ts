import {ReactNode, MouseEvent} from 'react';
import CSS from 'csstype';

export type sizeUnit = 'px' | '%' | 'em' | 'fr';
export type TCol = true|'auto'|number|`${number}${sizeUnit}`|'min-content'|'max-content'|`minmax('${number}${sizeUnit}', '${number}${sizeUnit}')`;


export type TID = string | number;
type TFieldValue = string | number | JSX.Element;
type TFieldFunc = (args: {isActive: boolean, collapse: (event: MouseEvent) => void}) => TFieldValue;

interface IField<T extends TID> {
    id: T,
    [field: string]: TFieldValue | TFieldFunc;
}

interface IDetail {
    config: {
        [field: string]: IConfig
    },
    data: Array<{
        [field: string]: TFieldValue;
    }>,
}

export interface IData<T extends TID> {
    id: T,
    appendData?: string | number | JSX.Element,
    detail?: JSX.Element | IDetail,
    disabled?: boolean,
    onClickRow?: () => void,
    field: IField<T>
}


export type TDataFooterContent = React.ReactElement;




export interface IConfig {
    colSpan?: number,
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
}


export interface IFooter<T> {
    [field: string]: { value: TFieldValue } & IConfig;
}

export interface ITitle extends IConfig{
    className?: string,
    col: TCol,
    field: string,
    text: string|number|ReactNode,
    titleAlign?: 'left'|'center'|'right',
    isEnableSort?: boolean,
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



export interface ITableProps<T extends string|number> {
    className?: string;
    style?: CSS.Properties,
    isDark?: boolean
    isFetching?: boolean,
    title: ITitle[],
    data?: IData<T>[],
    footer?: IFooter<T>
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
