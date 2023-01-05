import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import ProtectedRoute from './components/routing/ProtectedRoute'

//======View
import Auth from './views/Auth'
import User from './views/User'
import { ContractView,Inputforms} from './views/ContractView'
import MiscExpenseCost from './views/MiscExpenseCost'
import GuaranteeLetterCost from './views/GuaranteeLetterCostView'
import MandayCostView from './views/MandayCostView'
import ProductCostView from './views/ProductCostView'
import ImplementationView from './views/ImplementationCostView'

//import PTHD from './views/PTHD'
import CPV from './views/CPV'
import CPTK from './views/CPTK'
import Phongban from './views/Phongban'

//=====context
import AuthContextProvider from './contexts/AuthContext'
import ContractContextProvider from './contexts/ContractContext'
import CPKContextProvider from './contexts/MiscExpenseContext'
import GuaranteeLetterCostContextProvider from './contexts/GuaranteeLetterCostContext'
import MandayCostContextProvider from './contexts/MandayCostContext'
import UserContextProvider from './contexts/UserContext'
import CTHHContextProvider from './contexts/ProductCostContext'
import ImplementationCostContextProvider from './contexts/ImplementationCostContext'

import PhongbanContextProvider from './contexts/PhongbanContext'
import CPVContextProvider from './contexts/CPVContext'



function App() {
	return (
		<>
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
						
						<CTHHContextProvider>
							<ProtectedRoute exact path='/product-cost' component={ProductCostView} />
						</CTHHContextProvider>

						<ImplementationCostContextProvider>
							<ProtectedRoute exact path='/implementation-cost' component={ImplementationView} />
						</ImplementationCostContextProvider>
						

						
						{/* {<CTHHContextProvider>
							<ProtectedRoute exact path='/PTHD' component={PTHD} />
						</CTHHContextProvider>} */}
						

						<UserContextProvider>
							<ProtectedRoute exact path='/user' component={User} />
						</UserContextProvider>
						
						<ContractContextProvider>
							<ProtectedRoute exact path='/contract' component={ContractView} />
						</ContractContextProvider>

						<ContractContextProvider>
							<ProtectedRoute exact path='/contract/forms' component={Inputforms} />
						</ContractContextProvider>

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
							<ProtectedRoute exact path='/MiscExpenseCost' component={MiscExpenseCost} />
						</CPKContextProvider>

						<GuaranteeLetterCostContextProvider>
							<ProtectedRoute exact path='/guarantee-letter-cost' component={GuaranteeLetterCost} />{/* new */}
						</GuaranteeLetterCostContextProvider>

						<MandayCostContextProvider>
							<ProtectedRoute exact path='/manday-cost' component={MandayCostView} />
						</MandayCostContextProvider>


						
						{/*<ProtectedRoute exact path='/dashboard' component={Dashboard} />*/}
						
						</>

						
					</Switch>
				</Router>
		</AuthContextProvider>
		</>
	)
}
export default App
