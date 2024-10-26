import {formatCurrency} from '@acrool/js-utils/number';
import {data, IPaginateData} from './data';

/**
 * Mock 排序
 * @param by
 * @param field
 * @param a
 * @param b
 */
export const mockSort = (by: string, field: string, a: IPaginateData, b: IPaginateData) => {

    const fieldName = field as keyof IPaginateData;

    if (a[fieldName] < b[fieldName]) {
        return by.toLowerCase() === 'asc' ? -1 : 1;
    }else if (a[fieldName] > b[fieldName]) {
        return by.toLowerCase() === 'asc' ?  1: -1;
    }
    // a 必須等於 b
    return 0;
};


/**
 * 計算金額
 * @param rows
 */
export const calcAmount = (rows: IPaginateData[]) => {
    return formatCurrency(rows.reduce((curr, row) => curr + row.amount,0));
};


/**
 * Mock: 取得每頁資料
 * @param currentPage
 * @param pageLimit
 * @param order
 */
export const getPageData = (currentPage: number, pageLimit: number, order?: {orderField: string, orderBy: string}) => {

    if(order){
        data.sort((a, b) => mockSort(order.orderBy, order.orderField, a,b));
    }

    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
};
