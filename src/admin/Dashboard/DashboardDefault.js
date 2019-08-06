import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import Axios from 'axios';
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
import navigationAdmin from '../../_navAdmin';
import Dashboard from './Dashboard';


const AdminDefaultAside = React.lazy(() => import('../Aside/aside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));

class DashboardDefaultAdmin extends Component {
constructor(props){
  super(props);
  this.state={
    user:{},
    countings:{},
    stats:[]
  }
}
componentDidMount(){
  Axios({
    withCredentials:true,
    method:'get',
    url:'/adminInquire'
  })
  .then(res=>{
    console.log(res.data)
    this.setState({
      countings:res.data.countings,
      user:res.data.user,
      stats: res.data.stats
    })
  })
}
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    const {user,stats, countings} =this.state
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader user={user} username="Genesis" onLogout={e => this.signOut(e)}  />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <Suspense>
              <AppSidebarNav navConfig={navigationAdmin} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main" style={{ backgroundColor: "#f5f5f5" }}>
            <AppBreadcrumb />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                  <Dashboard countings={countings} stats={stats}  />
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <AdminDefaultAside />
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

export default DashboardDefaultAdmin;
