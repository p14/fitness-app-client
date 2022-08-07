import React from 'react';
import { useSessionContext } from '../../context/session.context';
import AccountForm from './AccountForm';
import AccountPasswordForm from './AccountPasswordForm';

const AccountEditor: React.FC = () => {

  const sessionContext = useSessionContext();

  return (
    <>
      <AccountForm user={sessionContext.user} setSession={sessionContext.setSession} />
      <AccountPasswordForm user={sessionContext.user} />
    </>
  );
}

export default AccountEditor;
