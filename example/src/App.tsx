import {GridThemeProvider} from '@acrool/react-grid';
import Example from './views/Example';
import Banner from './components/Banner';


function App() {
    return (
        <GridThemeProvider>
            <Banner/>

            <Example/>
        </GridThemeProvider>

    );
}

export default App;


