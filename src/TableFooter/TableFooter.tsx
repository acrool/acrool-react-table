import {TFooter, TTableTitle, TBodyDataFieldKey, TLineHeight} from '../types';
import {getColSpan} from '../utils';
import {CSSProperties} from 'react';


interface IProps <K extends TBodyDataFieldKey>{
    title: TTableTitle<K>
    data?: TFooter<K>
    lineHeight?: TLineHeight
}


/**
 * Table Footer
 * 額外顯示資訊 例如統計
 */
const TableFooter = <K extends TBodyDataFieldKey>({
    title,
    data,
    lineHeight,
}: IProps<K>) => {

    const renderFooterData = () => {
        if(data){
            let ignoreMerge = 0;
            return Object.keys(title)?.reduce((curr, titleKey) => {
                const titleRow = title[titleKey];

                const field = data[titleKey];
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
                        key={`tfootTh_${titleKey}`}
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

    return <tfoot style={{
        '--footer-line-height': lineHeight,
    } as CSSProperties}>
        <tr>
            {renderFooterData()}
        </tr>
    </tfoot>;
};

export default TableFooter;
