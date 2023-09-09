import {CSSProperties} from 'react';
import cx from 'classnames';
import {ITitle, IFooter} from '../types';
import {getColSpan} from '../utils';


interface IProps<T> {
    title: ITitle[],
    data?: IFooter,
}


/**
 * Table Footer
 * 額外顯示資訊 例如統計
 */
const TableFooter = <T extends string|number>({
    title,
    data,
}: IProps<T>) => {

    const renderFooterData = () => {
        if(data){
            let ignoreMerge = 0;
            return title?.reduce((curr, titleRow) => {
                const field = data[titleRow.field];
                const colSpan = field?.colSpan ?? 1;

                if(ignoreMerge > 0){
                    ignoreMerge -= 1;
                    return curr;
                }

                if(colSpan > 1){
                    ignoreMerge = colSpan - 1;
                }

                return [
                    ...curr,
                    <th
                        key={`tfootTh_${titleRow.field}`}
                        data-align={field?.dataAlign}
                        data-vertical={titleRow.dataVertical}
                        {...getColSpan(colSpan)}
                    >
                        {field?.value ?? ''}
                    </th>
                ];
            }, []);
        }
    };

    return <tfoot>
        <tr>
            {renderFooterData()}
        </tr>
    </tfoot>;
};

export default TableFooter;
