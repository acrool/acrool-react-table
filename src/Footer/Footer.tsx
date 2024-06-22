import {TFooter, TTableTitle, TBodyDataFieldKey, TTitleCol} from '../types';
import {getCalcStickyLeft, getColSpan} from '../utils';
import {objectKeys} from 'bear-jsutils/object';
import {getColSpanConfig, getStickyLeftConfig} from "./utils";


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

            const colSpanConfig = getColSpanConfig(title, data);
            const stickyLeftConfig = getStickyLeftConfig(title, data);

            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const footerField = dataRow[titleKey];
                    const titleRow = title[titleKey];

                    const colSpan = colSpanConfig?.[index]?.[titleKey];

                    // 被合併為 undefined
                    if(typeof colSpan === 'undefined'){
                        return curr;
                    }

                    const stickyLeft = stickyLeftConfig?.[index]?.[titleKey];
                    const children = footerField?.value;

                    const {style: colSpanStyles} = getColSpan(colSpan);
                    const {style: stickyLeftStyles} = getCalcStickyLeft(stickyLeft, titleRow.isSticky);

                    const args = {
                        key: `tfootTd_${index}_${titleKey}`,
                        className: titleRow.className,
                        'aria-label': typeof titleRow.text === 'string' ? titleRow.text: '',
                        'data-align': titleRow?.dataAlign,
                        'data-vertical': titleRow.dataVertical,
                        'data-sticky': titleRow.isSticky ? '': undefined,
                        colSpan: colSpan > 1 ? colSpan: undefined,
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

    return <tfoot className="acrool-table__content">
        {renderBodyData()}
    </tfoot>;
};

export default Footer;
