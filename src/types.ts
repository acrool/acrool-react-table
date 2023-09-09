import {ReactNode} from 'react';
import CSS from 'csstype';

export type sizeUnit = 'px' | '%' | 'em' | 'fr';
export type TCol = true|'auto'|number|`${number}${sizeUnit}`|'min-content'|'max-content'|`minmax('${number}${sizeUnit}', '${number}${sizeUnit}')`;



// <select class = 'unit-select';
// aria - label = 'column 2 unit';
// data - v - f22bf1ba = '';
// data - v - 003;
// f2257 = '' > <option data - v - f22bf1ba = '' > fr < /option><option data-v-f22bf1ba="">px</;
// option > <option data - v - f22bf1ba = '' > % </option><option data-v-f22bf1ba="">em</;
// option > <option data - v - f22bf1ba = '' > auto < /option><option data-v-f22bf1ba="">min-content</;
// option > <option data - v - f22bf1ba = '' > max - content < /option><option data-v-f22bf1ba="">minmax</;
// option > </select>;

type TFieldValue = string | number | JSX.Element;
type TFieldFunc = (args: {isActive: boolean, collapse: () => void}) => TFieldValue;

interface IField<T> {
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

export interface IData<T> {
    id: T,
    appendData?: string | number | JSX.Element,
    // detail?: JSX.Element | Array<IField<T>>,
    // detail?: JSX.Element | IDetail,
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


export interface IFooter extends IConfig{
    className?: string,
    field: string,
    text: string|number|ReactNode,
    colSpan?: number,
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
}

export interface ITitle extends IFooter{
    col: TCol,
    titleAlign?: 'left'|'center'|'right',
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



export interface ITableProps<T extends string|number> {
    className?: string;
    style?: CSS.Properties,
    isDark?: boolean
    isFetching?: boolean,
    title: ITitle[],
    data?: IData<T>[],
    footer?: IFooter
    gap?: string
    dataFooterContent?: TDataFooterContent, // ex: total...
    paginateInfo?: IPaginateInfo,
    paginateMeta?: IPaginateMeta,

    isVisibleHeader?: boolean,
    isStickyHeader?: boolean,
    isVisiblePaginate?: boolean,
    onChangePage?: TOnChangePage,
    pageLimitOptions?: number[];

    renderNoDaa?: () => JSX.Element;
}
