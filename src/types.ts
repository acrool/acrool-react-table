import {ReactNode, MouseEventHandler, JSX} from 'react';
import CSS from 'csstype';
import {IPaginateVisibleProps} from './Paginate/types';


export interface IConfig {
    colSpan?: number,
    rowSpan?: number,
    dataAlign?: 'left'|'center'|'right',
    dataVertical?: 'top'|'center'|'bottom',
    className?: string,
}
export type TLineHeight = `${number}${TSizeUnit}`|'auto'

export enum ETableMode {
    table = 'table',
    cell = 'cell',
}

/** -------------------------------
 *             Title
 * ------------------------------ */
export type TSizeUnit = 'px' | '%' | 'em' | 'fr' | 'rem';
export type TSizeUnitOrNumber = number|`${number}${TSizeUnit}`;
export type TTitleCol = true|'auto'|TSizeUnitOrNumber;


export interface ITitleField extends IConfig {
    className?: string,
    col: TTitleCol,
    text?: string|number|ReactNode,
    titleAlign?: 'left'|'center'|'right',
    isEnableSort?: boolean,
    sticky?: 'left'|'right',
    isHidden?: boolean,
}

export type TTableTitle<K extends string> = {
    [P in K]: ITitleField;
}

export type TOnChangeSortField = (meta: IOrder) => void

export interface IOrderByType {asc: string, desc: string}

/** -------------------------------
 *             Body
 * ------------------------------ */

export type TBodyDataFieldKey = string;
export type TFieldValue = string | number | boolean | JSX.Element;
interface TFieldFuncArgs {isActive: boolean, collapse: MouseEventHandler}
type TFieldFunc = (args: TFieldFuncArgs) => TFieldValue;

export type TBodyDataField<K extends TBodyDataFieldKey> = {
    [P in K]?: TFieldValue | TFieldFunc | { value: TFieldValue } & IConfig;
}

export type TBodyDataDetail<K extends TBodyDataFieldKey> = {
    [P in K]?: TFieldValue | { value: TFieldValue } & IConfig;
}
//
// export type TBodyDataDetail<K extends TBodyDataFieldKey> = {
//     config?: {
//         [P in K]?: IConfig
//     },
//     data: Array<{
//         [P in K]?: TFieldValue;
//     }>,
// }

export type TBodyDataID = string | number;
export type TOnClickRow = <I extends TBodyDataID>(id: I, collapse: () => void) => void;
export type TOnHoverRow = <I extends TBodyDataID>(id: I) => void;
export type TOnLeaveRow = (evt: MouseEvent) => void;

export interface ITableBody<K extends TBodyDataFieldKey, I extends TBodyDataID> {
    id: I,
    detail?: ReactNode | TBodyDataDetail<K>[],
    disabled?: boolean,
    onClickRow?: TOnClickRow,
    onHoverRow?: TOnHoverRow,
    onLeaveRow?: TOnLeaveRow,
    field: TBodyDataField<K>
}


/** -------------------------------
 *             Footer
 * ------------------------------ */
export type TFooter<K extends TBodyDataFieldKey> = {
    [P in K]?: TFieldValue | { value: TFieldValue } & IConfig;
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


export interface ISortableData {
    items: string[],
    active: {
        index: number
        id: string,
    },
    over: {
        index: number
        id: string,
    },
}

export type TOnChangePage = (meta: IPaginateMeta, isUsePreMeta?: boolean) => void

export type TCollapseEvent = (e: React.MouseEvent) => void

export type TOnChangeSortable = (sortableData: ISortableData) => void;


/** -------------------------------
 *             Table
 * ------------------------------ */
export interface ITableProps<I extends TBodyDataID, K extends TBodyDataFieldKey> extends IPaginateVisibleProps {
    id?: string
    className?: string
    style?: CSS.Properties
    isDark?: boolean
    locale?: string
    isFetching?: boolean
    title: TTableTitle<K>
    data?: ITableBody<K, I>[]
    onChangeSortable?: TOnChangeSortable
    footer?: TFooter<K>[] // ex: calc total...
    headerLineHeight?: TLineHeight
    bodyLineHeight?: TLineHeight
    footerLineHeight?: TLineHeight
    cellLineHeight?: TLineHeight
    gap?: string
    paginateInfo?: IPaginateInfo
    paginateMeta?: IPaginateMeta

    isEnableOverflowX?: boolean
    isEnableOverflowY?: boolean
    isVisibleHeader?: boolean
    isVisiblePaginate?: boolean
    isEnableChangePageScrollTop?: boolean
    isEnableDragSortable?: boolean
    isEnableHover?: boolean
    // isOverflow?: boolean
    isStickyHeader?: boolean
    tableCellMediaSize?: number
    onChangePage?: TOnChangePage
    pageLimitOptions?: number[]

    orderByType?: IOrderByType
    renderNoData?: JSX.Element|string
    renderFetching?: JSX.Element|string

}
