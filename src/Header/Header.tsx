import {
    IOrder,
    TOnChangeSortField,
    TTableTitle,
    TBodyDataFieldKey,
    IOrderByType, TTitleCol
} from '../types';
import {objectKeys} from 'bear-jsutils/object';
import styles from '../styles.module.scss';
import {getCalcStickyLeft, getColSpan} from '../utils';
import React from 'react';
import {getColSpanConfig, getStickyLeftConfig} from './utils';


interface IProps<K extends TBodyDataFieldKey> {
    title: TTableTitle<K>
    onChangeSortField?: TOnChangeSortField
    isStickyHeader?: boolean
    order?: IOrder
    orderByType?: IOrderByType
}


/**
 * Table Header
 */
const Header = <K extends TBodyDataFieldKey>({
    title,
    order,
    orderByType = {asc: 'ASC', desc: 'DESC'},
    onChangeSortField = () => {},
}: IProps<K>) => {

    const renderTitle = () => {



        const colSpanConfig = getColSpanConfig(title);
        const stickyLeftConfig = getStickyLeftConfig(title);



        const titleKeys = objectKeys(title);
        return titleKeys
            .filter(titleKey => !title[titleKey].isHidden)
            ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                const fieldConfig = title[titleKey];
                const isEnableSort = fieldConfig.isEnableSort;

                const sortType: 'descending'|'ascending'|undefined = order?.orderField === titleKey && order?.orderBy.toLowerCase() === 'asc' ? 'ascending':
                    order?.orderField === titleKey && order?.orderBy?.toLowerCase() === 'desc' ? 'descending':
                        undefined;

                const colSpan = colSpanConfig?.[titleKey];


                // 被合併為 undefined
                if(typeof colSpan === 'undefined'){
                    return curr;
                }


                const stickyLeft = stickyLeftConfig?.[titleKey];



                const {style: colSpanStyles} = getColSpan(colSpan);
                const {style: stickyLeftStyles} = getCalcStickyLeft(stickyLeft, fieldConfig.isSticky);
                const args = {
                    key: `theadTh_${titleKey}`,
                    className: fieldConfig.className,
                    'aria-label': typeof fieldConfig.text === 'string' ? fieldConfig.text: '',
                    'aria-sort': sortType,
                    'data-align': fieldConfig?.dataAlign,
                    'data-vertical': fieldConfig.dataVertical,
                    'data-sticky': fieldConfig.isSticky ? '': undefined,
                    'data-sort': isEnableSort ? '': undefined,
                    colSpan: colSpan > 1 ? colSpan: undefined,
                    style: {
                        ...colSpanStyles,
                        ...stickyLeftStyles,
                    },
                    children: <>
                        {fieldConfig.text}
                        <div className={styles.sortColumn}/>
                    </>,
                    onClick: isEnableSort ? () => {
                        onChangeSortField({
                            orderField: titleKey,
                            orderBy: (order?.orderBy?.toLowerCase() === 'desc' && order.orderField === titleKey) ? orderByType?.asc: orderByType?.desc
                        });
                    }: undefined
                };
                return [
                    ...curr,
                    <th
                        {...args}
                    />,
                ];
            }, []);



        // .map((titleKey, idx) => {
        //     const titleRow = title[titleKey];
        //     const isEnableSort = titleRow.isEnableSort;
        //     const sortType = order?.orderField === titleKey && order?.orderBy.toLowerCase() === 'asc' ? 'ascending':
        //         order?.orderField === titleKey && order?.orderBy?.toLowerCase() === 'desc' ? 'descending':
        //             undefined;
        //
        //     const {style: stickyLeftStyles} = getCalcStickyLeft(calcLeft);
        //
        //
        //
        //     // 上一個
        //     const prevCol = title[titleKeys[idx - 1]]?.col;
        //     const prevIsSticky = title[titleKeys[idx - 1]]?.isSticky;
        //     if(prevIsSticky && idx > 0 && prevCol){
        //         calcLeft.push(prevCol);
        //     }
        //
        //     return (
        //         <th
        //             key={`columnTitle_${titleKey}`}
        //             data-align={titleRow.titleAlign}
        //             data-sticky={titleRow.isSticky ? '': undefined}
        //             aria-sort={sortType}
        //             data-enable-sort={isEnableSort ? '': undefined}
        //             style={{
        //                 ...stickyLeftStyles,
        //             }}
        //             onClick={isEnableSort ? () => {
        //                 onChangeSortField({
        //                     orderField: titleKey,
        //                     orderBy: (order?.orderBy?.toLowerCase() === 'desc' && order.orderField === titleKey) ? orderByType?.asc: orderByType?.desc
        //                 });
        //             }: undefined}
        //         >
        //             {titleRow.text}
        //             <div className={styles.sortColumn}/>
        //         </th>
        //     );
        // });

    };


    return <thead className="acrool-table__content">
        <tr>
            {renderTitle()}
        </tr>
    </thead>;
};

export default Header;


