import React from 'react';

// Components
import {IOrder, ITitle, TOnChangeSortField} from '../types';
import elClassNames from '../el-class-names';
import {SortDownIcon, SortIcon, SortUpIcon} from '../Icon';
import {getCol} from '../utils';


interface IProps {
    title: ITitle[],
    onChangeSortField?: TOnChangeSortField;
    isStickyHeader?: boolean;
    order?: IOrder,
}


/**
 * Table Header
 */
const TableHeader = ({
    title= [],
    order,
    isStickyHeader = false,
    onChangeSortField = () => {},
}: IProps) => {

    const renderTitle = () => {
        return title.map(titleRow => {
            return (
                <div
                    className={elClassNames.itemColumn}
                    key={`columnTitle_${titleRow.field}`}
                    data-align={titleRow.titleAlign}
                    style={getCol(titleRow.col)}
                >
                    {titleRow.isEnableSort ? (
                        <button
                            className={elClassNames.headerSortButton}
                            data-active={order?.orderField === titleRow.field}
                            onClick={() => {
                                onChangeSortField({
                                    orderField: titleRow.field,
                                    orderBy: (order?.orderBy === 'DESC' && order.orderField === titleRow.field) ? 'ASC':'DESC',
                                });
                            }}>
                            {titleRow.text}

                            {order?.orderField === titleRow.field ?
                                order?.orderBy === 'ASC' ? <SortUpIcon/> : <SortDownIcon/> :
                                <SortIcon/>
                            }

                        </button>
                    ): titleRow.text}
                </div>
            );
        });

    };


    return <div className={elClassNames.headerInner} data-sticky={isStickyHeader}>
        <div className={elClassNames.itemUl}>
            <li className={elClassNames.itemLi}>{renderTitle()}</li>
        </div>
    </div>;
};

export default TableHeader;


