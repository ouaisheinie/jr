import "./App.css";
// import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnAuthenticatedApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
