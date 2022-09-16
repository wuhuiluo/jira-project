import React from "react";
import { Authenticated } from 'screen/authenticatedapp/index'
import { UnAuthenticatedApp } from 'screen/unauthenticated-app/index'
import { useAuth } from 'context/auth-context'
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {
        user ? <Authenticated /> : <UnAuthenticatedApp />
      }
    </div>
  );
}

export default App;
