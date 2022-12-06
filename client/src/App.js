import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import PostContextProvider from './contexts/PostContext'

import CPKContextProvider from './contexts/CPKContext'
import UserContextProvider from './contexts/UserContext'
import CPTBLContextProvider from './contexts/CPTBLContext'
import MDKSContextProvider from './contexts/MDKSContext'
import CTHHContextProvider from './contexts/CTHHContext'
import PhongbanContextProvider from './contexts/PhongbanContext'
import CPVContextProvider from './contexts/CPVContext'

import CPK from './views/CPK'
import User from './views/User'
import CPTBL from './views/CPTBL'
import MDKS from './views/MDKS'
import CTHH from './views/CTHH'
import PTHD from './views/PTHD'
import CPV from './views/CPV'
import CPTK from './views/CPTK'
import Phongban from './views/Phongban'

function App() {
	return (
		<AuthContextProvider>
				<Router>
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route
							exact
							path='/login'
							render={props => <Auth {...props} authRoute='login' />}
						/>
						<Route
							exact
							path='/register'
							render={props => <Auth {...props} authRoute='register' />}
						/>
						<>
						{/* <CTHHContextProvider>
							<ProtectedRoute exact path='/chitiethanghoa' component={CTHH} />
						</CTHHContextProvider> */}

						
						{/* {<CTHHContextProvider>
							<ProtectedRoute exact path='/PTHD' component={PTHD} />
						</CTHHContextProvider>} */}
						

						<UserContextProvider>
							<ProtectedRoute exact path='/user' component={User} />
						</UserContextProvider>

						<PhongbanContextProvider>
							<ProtectedRoute exact path='/phongban' component={Phongban} />
						</PhongbanContextProvider>
						
						<CPVContextProvider>
							<CTHHContextProvider>
								<ProtectedRoute exact path='/chiphivon' component={CPV} />
							</CTHHContextProvider>
						</CPVContextProvider>

						<CTHHContextProvider>
							<ProtectedRoute exact path='/chiphitrienkhai' component={CPTK} />
						</CTHHContextProvider>
						
						<CPKContextProvider>
							<ProtectedRoute exact path='/chiphikhac' component={CPK} />
						</CPKContextProvider>

						<CPTBLContextProvider>
							<ProtectedRoute exact path='/chiphibaolanh' component={CPTBL} />{/* new */}
						</CPTBLContextProvider>

						<MDKSContextProvider>
							<ProtectedRoute exact path='/mandaykysu' component={MDKS} />
						</MDKSContextProvider>


						
						{/*<ProtectedRoute exact path='/dashboard' component={Dashboard} />*/}
						
						</>

						
					</Switch>
				</Router>
		</AuthContextProvider>
	)
}
export default App
