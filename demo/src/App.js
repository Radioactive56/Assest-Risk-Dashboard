import './App.css';
import React from 'react';
import Home from './components/Home';
import Scans from './components/Scans';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Users from './components/Users';
import User from './components/User';
import Database from './components/Database';
import Login from './components/Login';
// import useAuth from './components/useAuth';
import PrivateRoute from './components/PrivateRoute';
import SidebarNew from './components/SidebarNew';
import PtAgeing from './components/PtAgeing';
import Update from './components/Update';
import UpdateScanTable from './components/UpdateScanTable';
import UpdateHostTable from './components/UpdateHostTable';
import UpdateMetaScanTable from './components/UpdateMetaScanTable';
import UpdateMetaHostTable from './components/UpdateMetaHostTable';
import UpdateMetaServiceTable from './components/UpdateMetaServiceTable';
import UpdateMetaVulnerability from './components/UpdateMetaVulnerability';
import Add from './components/Add';
import UpateMeta from './components/UpdateMeta';
import MetaAdd from './components/MetaAdd';
import Comb_pt_EAS from './components/Comb_pt_EAS';
import AddScanTable from './components/AddScanTable';
import Register from './components/Register';
import Test from './components/Test';
import UpdateMetaScan from './components/UpdateMetaScan';


export let API_URL = process.env.REACT_APP_API_URL

// urls to be :'/analytics'

//prt :8013

function App(){
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Register/>}></Route>
          <Route exact path='/test' element={<Test></Test>}></Route>
          <Route exact path='/setup' element={<Login/>}></Route>
          <Route exact path='/sidebar' element={<SidebarNew/>}></Route>
          <Route exact path="/dashboard" element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
          <Route exact path="/update_current_scan/:id" element={<PrivateRoute><UpdateMetaScan></UpdateMetaScan></PrivateRoute>}></Route>
          <Route exact path="/scans" element={<PrivateRoute><Scans></Scans></PrivateRoute>}></Route>
          <Route exact path="/user" element={<PrivateRoute><User></User></PrivateRoute>} ></Route>
          <Route exact path="/users" element={<PrivateRoute><Users></Users></PrivateRoute>}></Route>
          <Route exact path="/database" element={<PrivateRoute><Database></Database></PrivateRoute>}></Route>
          <Route exact path="/assetsummary" element={<PrivateRoute><Comb_pt_EAS></Comb_pt_EAS></PrivateRoute>}></Route>
          <Route exact path="/update_scan/:id" element={<PrivateRoute ><Update></Update></PrivateRoute>}></Route>
          <Route exact path="/update_meta_scan/:id" element={<PrivateRoute ><UpateMeta></UpateMeta></PrivateRoute>}></Route>
          <Route exact path="/update_scantable/:id" element={<PrivateRoute ><UpdateScanTable></UpdateScanTable></PrivateRoute>}></Route>
          <Route exact path="/update_hosttable/:id" element={<PrivateRoute ><UpdateHostTable></UpdateHostTable></PrivateRoute>}></Route>
          <Route exact path="/update_metascantable/:id" element={<PrivateRoute ><UpdateMetaScanTable></UpdateMetaScanTable></PrivateRoute>}></Route>
          <Route exact path="/update_metahosttable/:id" element={<PrivateRoute ><UpdateMetaHostTable></UpdateMetaHostTable></PrivateRoute>}></Route>
          <Route exact path="/update_metaservicetable/:id" element={<PrivateRoute ><UpdateMetaServiceTable></UpdateMetaServiceTable></PrivateRoute>}></Route>
          <Route exact path="/update_metavulenrabilitytable/:id" element={<PrivateRoute ><UpdateMetaVulnerability></UpdateMetaVulnerability></PrivateRoute>}></Route>
          <Route exact path="/addScan" element={<PrivateRoute ><Add></Add></PrivateRoute>}></Route>
          <Route exact path='/addscanTable' element={<PrivateRoute><AddScanTable></AddScanTable></PrivateRoute>}></Route>
          <Route exact path="/addMeta" element={<PrivateRoute><MetaAdd></MetaAdd></PrivateRoute>}></Route>
        </Routes>
      </Router>
  )
}


// function App(){
//   const {authenticated}=useAuth();
//   return (
//     <Router>
//       <Switch>
//        <Route exact path="/" component={Login}></Route>
//         <Route path="/dashboard">
//         {authenticated ? <Home/>: <Redirect to='/'/>}
//         </Route>
//         <Route exact path="/scans" >
//         {authenticated ? <Scans/>: <Redirect to='/'/>}
//         </Route>
//         <Route exact path="/users">
//         {authenticated ? <Users/>: <Redirect to='/'/>}
//         </Route>
//         <Route exact path="/main">
//         {authenticated ? <Main/>: <Redirect to='/'/>}
//         </Route>
//         <Route exact path="/database">
//         {authenticated ? <Database/>: <Redirect to='/'/>}
//         </Route>
//        </Switch>
//     </Router>

//   );
// }

export default App;
