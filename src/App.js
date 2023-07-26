import { Container } from 'react-bootstrap'
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={() => <PostsPage message="No Results Found - adjust keyword search" />} 
          />
          <Route 
            exact 
            path="/feed" 
            render={() => <PostsPage message="No Results Found - adjust keyword search or follow user" />}
            filter={`owner__followed__owner__profile=${profile_id}&`}
          />
          <Route 
            exact 
            path="/liked" 
            render={() => <PostsPage message="No Results Found - adjust keyword search or like post" />}
            filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
        
      </Container>
    </div>
  );
}

export default App;