import {data, IPaginateData} from './config/data';


import {Col, Container, GridThemeProvider, Row} from '@acrool/react-grid';
import Example from './views/Example';
import Banner from './components/Banner';






const getPageData = (currentPage: number, pageLimit: number, order?: {orderField: string, orderBy: string}) => {

    if(order){
        data.sort((a, b) => mockSort(order.orderBy, order.orderField, a,b));
    }

    const pageStart = (currentPage -1) * pageLimit;
    return data.slice(pageStart, pageStart + pageLimit );
};



const mockSort = (by: string, field: string, a: IPaginateData, b: IPaginateData) => {

    const fieldName = field as keyof IPaginateData;

    if (a[fieldName] < b[fieldName]) {
        return by.toLowerCase() === 'asc' ? -1 : 1;
    }else if (a[fieldName] > b[fieldName]) {
        return by.toLowerCase() === 'asc' ?  1: -1;
    }
    // a 必須等於 b
    return 0;
};




function App() {



    return (
        <GridThemeProvider>
            <Banner/>
            <Example/>
        </GridThemeProvider>

    );
}

export default App;


