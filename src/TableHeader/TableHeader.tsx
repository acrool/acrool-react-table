import {
    IOrder,
    TOnChangeSortField,
    TTableTitle,
    TBodyDataFieldKey,
    IOrderByType
} from '../types';
import elClassNames from '../el-class-names';
import {objectKeys} from 'bear-jsutils/object';


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
const TableHeader = <K extends TBodyDataFieldKey>({
    title,
    order,
    orderByType = {asc: 'ASC', desc: 'DESC'},
    onChangeSortField = () => {},
}: IProps<K>) => {

    const renderTitle = () => {
        return objectKeys(title)
            .filter(titleKey => title[titleKey].isHidden !== true)
            .map(titleKey => {
                const titleRow = title[titleKey];
                const isEnableSort = titleRow.isEnableSort;
                const sortType = order?.orderField === titleKey && order?.orderBy.toLowerCase() === 'asc' ? 'ascending':
                    order?.orderField === titleKey && order?.orderBy?.toLowerCase() === 'desc' ? 'descending':
                        undefined;

                return (
                    <th
                        key={`columnTitle_${titleKey}`}
                        data-align={titleRow.titleAlign}
                        aria-sort={sortType}
                        data-enable-sort={isEnableSort ? '': undefined}
                        onClick={isEnableSort ? () => {
                            onChangeSortField({
                                orderField: titleKey,
                                orderBy: (order?.orderBy?.toLowerCase() === 'desc' && order.orderField === titleKey) ? orderByType?.asc: orderByType?.desc
                            });
                        }: undefined}
                    >
                        {titleRow.text}
                        <div className={elClassNames.sortColumn}/>
                    </th>
                );
            });

    };


    return <thead>
        <tr>
            {renderTitle()}
        </tr>
    </thead>;
};

export default TableHeader;


