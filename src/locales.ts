import {objectKeys} from '@acrool/js-utils/object';

interface ILocale {
    [locale: string]: {
        [key: string]: string,
    }
}

const locales: ILocale = {
    'en-US': {
        'com.table.field.action': 'Action',
        'com.table.showPage': 'Show {start} - {end} item',
        'com.table.totalPage': 'Total {totalItem} item / {totalPage} Page',
        'com.table.pageLimit': '{item}/Page',
        'com.table.next': 'Next',
        'com.table.prev': 'Prev',
        'com.table.notFound.title': 'Not Found',
        'com.table.notFound.desc': 'Choose a different filter to view test results to you',
    },
    'zh-TW': {
        'com.table.field.action': '操作',
        'com.table.showPage': '顯示 {start} - {end} 筆',
        'com.table.totalPage': '總共 {totalItem} 筆 / {totalPage} 頁',
        'com.table.pageLimit': '{item}筆/頁',
        'com.table.next': '下一頁',
        'com.table.prev': '上一頁',
        'com.table.notFound.title': '沒有符合的資料',
        'com.table.notFound.desc': '選擇不同的過濾條件以查看測試結果',
    },
    'zh-CN': {
        'com.table.field.action': '操作',
        'com.table.showPage': '显示 {start} - {end} 笔',
        'com.table.totalPage': '总共 {totalItem} 笔 / {totalPage} 页',
        'com.table.pageLimit': '{item}笔/页',
        'com.table.next': '下一页',
        'com.table.prev': '上一页',
        'com.table.notFound.title': '没有符合的资料',
        'com.table.notFound.desc': '选择不同的过滤条件以查看测试结果',
    },
    'ja-JP': {
        'com.table.field.action': '操作する',
        'com.table.showPage': '{start} ～ {end} ペン',
        'com.table.totalPage': '合計 {totalItem} ペン / {totalPage} ページを表示しています',
        'com.table.pageLimit': '{item}ペン/ページ',
        'com.table.next': '次のページ',
        'com.table.prev': '前のページ',
        'com.table.notFound.title': '一致するデータがありません',
        'com.table.notFound.desc': '別のフィルターを選択してテスト結果を表示します',
    }
};


const useLocale = (locale?: string) => {
    const i18n = (id: string, options?: {def?: string, args?: object}) => {
        const selectLocale = typeof locale !== 'undefined' ? locale : 'en-US';
        const localeMap = locales[selectLocale] ? locales[selectLocale]: locales['en-US'];

        if(typeof localeMap !== 'undefined' && typeof localeMap[id] !== 'undefined'){
            let resText = localeMap[id];
            if(options?.args){
                objectKeys(options.args)
                    .forEach(argKey => {
                        if(options.args){
                            resText = resText?.replace(`{${argKey}}`, options.args[argKey]);
                        }
                    });
            }
            return resText;
        }

        if(typeof options?.def !== 'undefined'){
            return options?.def;
        }

        return id;
    };

    return {i18n};
};

export default useLocale;
