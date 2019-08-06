import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../../_nav';
import navigationAdmin from '../../_navAdmin'
import navigationCloser from '../../_navCloser'
import Dashboard from '../../agent/Dashboard/Dashboard'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      user: ""
    }

  }
  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        that.setState({
          authed: true,
          user: user.email
        })
      } else {
        that.setState({
          authed: false
        })
      }
    });
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>



  render() {
    console.log(this.state.user)
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <Suspense>
              {this.state.user === "admin@genesis.com" ?
                <AppSidebarNav navConfig={navigationAdmin} {...this.props} />
                :
                <AppSidebarNav navConfig={navigation} {...this.props} />
              }
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main" style={{ backgroundColor: "#fff" }}>
            <AppBreadcrumb />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Dashboard />
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
