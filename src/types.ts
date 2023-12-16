import {ReactNode, MouseEvent, MouseEventHandler} from 'react';
import CSS from 'csstype';


export interface IConfig {
    colSpan?: number,
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
}
export type TLineHeight = `${number}${TSizeUnit}`;

/** -------------------------------
 *             Title
 * ------------------------------ */
export type TSizeUnit = 'px' | '%' | 'em' | 'fr' | 'rem';
export type TTitleCol = true|'auto'|number|`${number}${TSizeUnit}`|'min-content'|'max-content'|`minmax('${number}${TSizeUnit}', '${number}${TSizeUnit}')`;


export interface ITitleField extends IConfig {
    className?: string,
    col: TTitleCol,
    text?: string|number|ReactNode,
    titleAlign?: 'left'|'center'|'right',
    isEnableSort?: boolean,
}

export type TTableTitle<K extends string> = {
    [P in K]: ITitleField;
}

export type TOnChangeSortField = (meta: IOrder) => void

/** -------------------------------
 *             Body
 * ------------------------------ */

export type TBodyDataFieldKey = string;
type TFieldValue = string | number | JSX.Element;
interface TFieldFuncArgs {isActive: boolean, collapse: MouseEventHandler}
type TFieldFunc = (args: TFieldFuncArgs) => TFieldValue;

type TBodyDataField<K extends TBodyDataFieldKey> = {
    [P in K]: TFieldValue | TFieldFunc | { value: TFieldValue } & IConfig;
}

type TBodyDataDetail<K extends TBodyDataFieldKey> = {
    config: {
        [P in K]?: IConfig
    },
    data: Array<{
        [P in K]?: TFieldValue;
    }>,
}

export type TBodyDataID = string | number;
export interface ITableBody<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    id: I,
    detail?: JSX.Element | TBodyDataDetail<K>,
    disabled?: boolean,
    onClickRow?: (collapse: () => void) => void,
    field: TBodyDataField<K>
}


/** -------------------------------
 *             Footer
 * ------------------------------ */
export type TFooter<K extends TBodyDataFieldKey> = {
    [P in K]?: { value: TFieldValue } & IConfig;
}




/** -------------------------------
 *             Paginate
 * ------------------------------ */
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
    orderBy: string,
}

export interface IPaginateMeta extends Required<IPage> {
    order?: IOrder,
}

export type TOnChangePage = (meta: IPaginateMeta, isUsePreMeta?: boolean) => void



/** -------------------------------
 *             Table
 * ------------------------------ */
export interface ITableProps<I extends TBodyDataID, K extends TBodyDataFieldKey> {
    className?: string
    style?: CSS.Properties
    isDark?: boolean
    locale?: string
    isFetching?: boolean
    title: TTableTitle<K>
    data?: ITableBody<K, I>[]
    footer?: TFooter<K> // ex: calc total...
    headerLineHeight?: TLineHeight,
    bodyLineHeight?: TLineHeight,
    footerLineHeight?: TLineHeight,
    cellLineHeight?: TLineHeight,
    gap?: string
    paginateInfo?: IPaginateInfo
    paginateMeta?: IPaginateMeta

    isVisibleHeader?: boolean
    isVisibleBorder?: boolean
    isVisibleVerticalBorder?: boolean
    isVisiblePaginate?: boolean
    isEnableHover?: boolean
    isEnableOddEven?: boolean
    isEnableChangePageScrollTop?: boolean
    isOverflow?: boolean
    isStickyHeader?: boolean
    tableCellMediaSize?: number
    onChangePage?: TOnChangePage
    pageLimitOptions?: number[]

    renderNoData?: JSX.Element|string
    renderFetching?: JSX.Element|string
}
