import {IOrder, TOnChangeSortField, TTableTitle, TBodyDataFieldKey, IOrderByType} from '../types';
import {objectKeys} from '@acrool/js-utils/object';
import styles from '../styles.module.scss';
import {getCalcStickyLeftStyles, getCol} from '../utils';
import React from 'react';
import {getHeaderColSpanConfig, getHeaderStickyLeftConfig, getHeaderStickyRightConfig} from './utils';


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
    isStickyHeader,
    orderByType = {asc: 'ASC', desc: 'DESC'},
    onChangeSortField = () => {},
}: IProps<K>) => {

    const renderTitle = () => {



        const colSpanConfig = getHeaderColSpanConfig(title);
        const stickyLeftConfig = getHeaderStickyLeftConfig(title);
        const stickyRightConfig = getHeaderStickyRightConfig(title);



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
                const stickyRight = stickyRightConfig?.[titleKey];



                // const stickyTopStyles = getCalcStickyTopStyles(isStickyHeader);
                const stickyLeftStyles = getCalcStickyLeftStyles(fieldConfig.sticky === 'left' ? stickyLeft.widths: stickyRight.widths, fieldConfig.sticky);

                const args = {
                    key: `theadTh_${titleKey}`,
                    className: fieldConfig.className,
                    'aria-label': typeof fieldConfig.text === 'string' ? fieldConfig.text: '',
                    'aria-sort': sortType,
                    'data-align': fieldConfig?.titleAlign,
                    'data-vertical': fieldConfig.dataVertical,
                    'data-sticky': fieldConfig.sticky,
                    'data-first-sticky': (stickyLeft.isFirst || stickyRight.isFirst)? '':undefined,
                    'data-sort': isEnableSort ? '': undefined,
                    // width: getCol(fieldConfig.col),
                    colSpan: colSpan > 1 ? colSpan: undefined,
                    style: {
                        // ...stickyTopStyles,
                        ...getCol(fieldConfig.col),
                        ...stickyLeftStyles,
                    },
                    children: isEnableSort ?
                        <div className={styles.titleSort}>
                            <div>{fieldConfig.text}</div>
                            <div className={styles.sortColumn}/>
                        </div>:
                        fieldConfig.text
                    ,
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


    return <thead className="acrool-react-table__content" data-sticky-top={isStickyHeader ? '': undefined}>
        <tr>
            {renderTitle()}
        </tr>
    </thead>;
};

export default Header;


