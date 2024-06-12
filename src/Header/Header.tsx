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

        // 忽略合併行數
        let colMergeAfterIgnoreLength = 0;

        // 計算沾黏的位置
        let calcLeft: TTitleCol[] = ['0px'];

        const titleKeys = objectKeys(title);
        return titleKeys
            .filter(titleKey => !title[titleKey].isHidden)
            ?.reduce((curr: JSX.Element[], titleKey, idx) => {

                // const titleField = dataRow.field[titleKey];
                // const config = getConfig(titleField);

                const titleRow = title[titleKey];
                const isEnableSort = titleRow.isEnableSort;

                const sortType: 'descending'|'ascending'|undefined = order?.orderField === titleKey && order?.orderBy.toLowerCase() === 'asc' ? 'ascending':
                    order?.orderField === titleKey && order?.orderBy?.toLowerCase() === 'desc' ? 'descending':
                        undefined;

                const fieldConfig = {
                    ...titleRow,
                    // ...config,
                };
                // const field = dataRow.field[titleKey];
                const colSpan = fieldConfig?.colSpan ?? 1;

                if(colMergeAfterIgnoreLength > 0){
                    colMergeAfterIgnoreLength -= 1;
                    return curr;
                }

                if(colSpan > 1){
                    colMergeAfterIgnoreLength = colSpan - 1;
                }

                // 上一個
                const prevCol = title[titleKeys[idx - 1]]?.col;
                const prevIsSticky = title[titleKeys[idx - 1]]?.isSticky;
                if(prevIsSticky && idx > 0 && prevCol){
                    calcLeft.push(prevCol);
                }

                const {style: colSpanStyles} = getColSpan(colSpan);
                const {style: stickyLeftStyles} = getCalcStickyLeft(calcLeft, titleRow.isSticky);
                const args = {
                    key: `theadTh_${titleKey}`,
                    className: titleRow.className,
                    'aria-label': typeof titleRow.text === 'string' ? titleRow.text: '',
                    'aria-sort': sortType,
                    'data-align': fieldConfig?.dataAlign,
                    'data-vertical': titleRow.dataVertical,
                    'data-sticky': titleRow.isSticky ? '': undefined,
                    'data-sort': isEnableSort ? '': undefined,
                    // colSpan,
                    style: {
                        ...colSpanStyles,
                        ...stickyLeftStyles,
                    },
                    children: <>
                        {titleRow.text}
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


