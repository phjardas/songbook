import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import styled from 'styled-components';
import Error from '../components/Error';
import FontAwesome from '../components/FontAwesome';
import Loading from '../components/Loading';
import Logo from '../components/Logo';
import { WithAuth } from '../providers/Auth';

const Splash = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: var(--primary);
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
`;

class SignIn extends React.Component {
  state = {
    signingIn: false,
    error: null,
  };

  render() {
    const { providers } = this.props;
    const { signingIn, error } = this.state;

    return (
      <Splash>
        <Logo />
        <h1 className="mt-3">Songbook</h1>

        {error && <Error error={error} />}
        {signingIn ? (
          <Loading message="Signing you in…" />
        ) : (
          <>
            <p>Please sign in:</p>
            <ButtonGroup>
              {providers.map(provider => (
                <Button key={provider.id} color="primary" outline onClick={() => this.signIn(provider.id)}>
                  <FontAwesome icon={provider.icon} className="mr-2" />
                  {provider.label}
                </Button>
              ))}
            </ButtonGroup>
          </>
        )}
      </Splash>
    );
  }

  signIn(providerId) {
    this.setState({ signingIn: true, error: null });
    this.props
      .signIn(providerId)
      .then(() => this.setState({ signingIn: false, error: null }))
      .catch(error => this.setState({ signingIn: false, error }));
  }
}

export default () => <WithAuth>{props => <SignIn {...props} />}</WithAuth>;
