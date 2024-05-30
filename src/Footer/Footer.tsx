import {TFooter, TTableTitle, TBodyDataFieldKey, TTitleCol} from '../types';
import {getCalcStickyLeft, getColSpan} from '../utils';
import {objectKeys} from 'bear-jsutils/object';


interface IProps <K extends TBodyDataFieldKey>{
    title: TTableTitle<K>
    data?: TFooter<K>[]
}


/**
 * Table Footer
 * 額外顯示資訊 例如統計
 */
const Footer = <K extends TBodyDataFieldKey>({
    title,
    data,
}: IProps<K>) => {


    /**
     * 產生表格內容
     */
    const renderBodyData = () => {

        return data?.map((dataRow, index) => {

            // 避免忽略行，CSS無法跳過，所以自行計算
            let cellTdIndex = 0;

            // 忽略合併行數
            let colMergeAfterIgnoreLength = 0;

            // 計算沾黏的位置
            let calcLeft: TTitleCol[] = ['0px'];

            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const footerField = dataRow[titleKey];

                    const titleRow = title[titleKey];

                    const colSpan = titleRow?.colSpan ?? 1;

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




                    const children = footerField?.value;


                    const {style: colSpanStyles} = getColSpan(colSpan);
                    const {style: stickyLeftStyles} = getCalcStickyLeft(calcLeft);
                    const args = {
                        key: `tfootTd_${index}_${titleKey}`,
                        className: titleRow.className,
                        'aria-label': typeof titleRow.text === 'string' ? titleRow.text: '',
                        'data-align': titleRow?.dataAlign,
                        'data-vertical': titleRow.dataVertical,
                        'data-sticky': titleRow.isSticky ? '': undefined,
                        colSpan,
                        style: {
                            ...colSpanStyles,
                            ...stickyLeftStyles,
                        },
                        children,
                    };
                    return [
                        ...curr,
                        <td {...args}/>,
                    ];
                }, []);

            return (<tr
                key={`tfootTr_${index}`}
            >
                {tds}
            </tr>);
        });
    };

    return <tfoot>
        {renderBodyData()}
    </tfoot>;
};

export default Footer;
