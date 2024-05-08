import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import { Auth } from './presentation/auth';
import { AuthState } from './presentation/auth/auth.state';
import { DocEditor } from './presentation/doc-editor';
import { Spacer } from './fragments/spacer';
import { Topbar } from './fragments/topbar';

export const App = observer(() => {
  const authState = useInjection(AuthState);

  return (
    <Fragment>
      {authState.isAuth ? (
        <Fragment>
          <Topbar />
          <Spacer />
          <DocEditor />
        </Fragment>
      ) : (
        <Auth />
      )}
    </Fragment>
  );
});
