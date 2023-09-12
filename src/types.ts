import {ReactNode, MouseEvent} from 'react';
import CSS from 'csstype';


export interface IConfig {
    colSpan?: number,
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
}

/** -------------------------------
 *             Title
 * ------------------------------ */
export type sizeUnit = 'px' | '%' | 'em' | 'fr' | 'rem';
export type TTitleCol = true|'auto'|number|`${number}${sizeUnit}`|'min-content'|'max-content'|`minmax('${number}${sizeUnit}', '${number}${sizeUnit}')`;


export interface ITitleField extends IConfig {
    className?: string,
    col: TTitleCol,
    text: string|number|ReactNode,
    titleAlign?: 'left'|'center'|'right',
    isEnableSort?: boolean,
}

export type TTitle<K extends string> = {
    [P in K]: ITitleField;
}

export type TOnChangeSortField = (meta: IOrder) => void

/** -------------------------------
 *             Body
 * ------------------------------ */

export type TBodyDataFieldKey = string;
type TFieldValue = string | number | JSX.Element;
interface TFieldFuncArgs {isActive: boolean, collapse: (event: MouseEvent) => void}
type TFieldFunc = (args: TFieldFuncArgs) => TFieldValue;

type TBodyDataField<K extends TBodyDataFieldKey> = {
    [P in K]: TFieldValue | TFieldFunc;
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
export interface IBodyData<I extends TBodyDataID, K extends TBodyDataFieldKey> {
    id: I,
    detail?: JSX.Element | TBodyDataDetail<K>,
    disabled?: boolean,
    onClickRow?: () => void,
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
    orderBy: 'DESC'|'ASC',
}

export interface IPaginateMeta extends Required<IPage> {
    order?: IOrder,
}

export type TOnChangePage = (meta: IPaginateMeta, isUsePreMeta?: boolean) => void



/** -------------------------------
 *             Table
 * ------------------------------ */
export interface ITableProps<T extends TBodyDataID, K extends TBodyDataFieldKey> {
    className?: string
    style?: CSS.Properties
    isDark?: boolean
    isFetching?: boolean
    title: TTitle<K>
    data?: IBodyData<T, K>[]
    footer?: TFooter<K> // ex: calc total...
    gap?: string
    paginateInfo?: IPaginateInfo
    paginateMeta?: IPaginateMeta

    isVisibleHeader?: boolean
    isStickyHeader?: boolean
    tableCellMediaSize?: number
    isVisiblePaginate?: boolean
    onChangePage?: TOnChangePage
    pageLimitOptions?: number[]

    renderNoData?: () => JSX.Element
}
