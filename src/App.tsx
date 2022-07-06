import { Fragment } from 'react';
import { CustomCursor } from './components/custom-cursor';
import { DocEditor } from './components/doc-editor';
import { ScrollContainer } from './components/scroll-container';
import { Spacer } from './components/spacer/spacer';
import { Topbar } from './components/topbar';

function App() {
  return (
    <Fragment>
      <Topbar />
      <Spacer />

      {/* <div style={{ margin: 100 }}>
        <CustomCursor />
      </div> */}

      <ScrollContainer>
        <DocEditor />
      </ScrollContainer>
    </Fragment>
  );
}

export default App;

