import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { Auth } from './components/auth';
import { AuthState } from './components/auth/auth.state';
import { DocEditor } from './components/doc-editor';
import { ScrollContainer } from './components/scroll-container';
import { Spacer } from './components/spacer';
import { Topbar } from './components/topbar';

function App() {
  const authState = useInjection(AuthState);

  return (
    <Fragment>
      {authState.isAuth ? (
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
      ) : (
        <Auth />
      )}
    </Fragment>
  );
}

export default observer(App);

