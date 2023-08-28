import {render, screen} from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom/cjs/react-router-dom';
import NavBar from '../NavBar.js';
import { CurrentUserProvider } from '../../contexts/CurrentUserContext.js';

test('renders NavBar', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    // screen.debug();
    const signInLink = screen.getByRole('link', {name: 'Sign-in'});
    // We can put .not.toBeInTheDocument(), if this is what is intended
    expect(signInLink).toBeInTheDocument();
})

test("renders link to the logged-in user for the user's profile", async () => {
    render(
        <Router>
            <CurrentUserProvider>
            <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const profileAvatar = await screen.findByText('Profile');
})