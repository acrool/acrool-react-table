import {IOrder, TOnChangeSortField, TTableTitle, TBodyDataFieldKey, IOrderByType} from '../types';
import {objectKeys} from 'bear-jsutils/object';
import styles from '../styles.module.scss';
import {getCalcStickyLeftStyles, getColSpanStyles} from '../utils';
import React from 'react';
import {getHeaderColSpanConfig, getHeaderStickyLeftConfig} from './utils';


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



        const colSpanConfig = getHeaderColSpanConfig(title);
        const stickyLeftConfig = getHeaderStickyLeftConfig(title);



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



                const colSpanStyles = getColSpanStyles(colSpan);
                const stickyLeftStyles = getCalcStickyLeftStyles(stickyLeft, fieldConfig.isSticky);
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

    };


    return <thead className="acrool-react-table__content">
        <tr>
            {renderTitle()}
        </tr>
    </thead>;
};

export default Header;


