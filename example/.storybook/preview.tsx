import type { Preview } from "@storybook/react";
import './reset.css';
import '@acrool/react-table/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
      (Story) => (
          <GridThemeProvider>
            <Story />
          </GridThemeProvider>
      ),
  ],
};

export default preview;
