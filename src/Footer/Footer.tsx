import {TFooter, TTableTitle, TBodyDataFieldKey} from '../types';
import {getCalcStickyLeftStyles, getColSpanStyles} from '../utils';
import {objectKeys} from 'bear-jsutils/object';
import {getFooterColSpanConfig, getFooterConfig, getFooterStickyLeftConfig} from './utils';


interface IProps <K extends TBodyDataFieldKey>{
    title: TTableTitle<K>
    data: TFooter<K>[]
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
    const renderFooterData = () => {


        return data.map((dataRow, index) => {

            const colSpanConfig = getFooterColSpanConfig(title, data);
            const stickyLeftConfig = getFooterStickyLeftConfig(title, data);

            const titleKeys = objectKeys(title);
            const tds = titleKeys
                ?.filter(titleKey => !title[titleKey].isHidden)
                ?.reduce((curr: JSX.Element[], titleKey, idx) => {
                    const footerField = dataRow[titleKey];
                    const config = getFooterConfig(footerField);
                    const titleRow = title[titleKey];


                    const fieldConfig = {
                        ...titleRow,
                        ...config,
                    };


                    const colSpan = colSpanConfig?.[index]?.[titleKey];

                    // 被合併為 undefined
                    if(typeof colSpan === 'undefined'){
                        return curr;
                    }

                    const stickyLeft = stickyLeftConfig?.[index]?.[titleKey];
                    const children = footerField?.value;

                    const colSpanStyles = getColSpanStyles(colSpan);
                    const stickyLeftStyles = getCalcStickyLeftStyles(stickyLeft, titleRow.isSticky);

                    const args = {
                        key: `tfootTd_${index}_${titleKey}`,
                        className: fieldConfig.className,
                        'aria-label': typeof titleRow.text === 'string' ? titleRow.text: '',
                        'data-align': fieldConfig?.dataAlign,
                        'data-vertical': fieldConfig.dataVertical,
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

    return <tfoot className="acrool-react-table__content">
        {renderFooterData()}
    </tfoot>;
};

export default Footer;
