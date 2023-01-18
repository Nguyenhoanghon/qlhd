import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import ProtectedRoute from './components/routing/ProtectedRoute'
//====== Components
import Auth from './views/Auth'
import User from './views/User'
import { ContractView,Inputforms,Contract_id} from './views/ContractView'

import MiscExpenseCost from './views/MiscExpenseCostView'
import GuaranteeLetterCost from './views/GuaranteeLetterCostView'
import MandayCostView from './views/MandayCostView'

import ImplementationView from './views/ImplementationCostView'
import AuxiliaryCost from './views/AuxiliaryCostView'
import CapitalExpenditure from './views/CapitalExpenditureCostView'

import {Summary,Summary_id} from './views/SummaryView'
import {ProductCost_all,ProductCost_idContract} from './views/ProductCostView'




//=====contexts
import AuthContextProvider from './contexts/AuthContext'
import ContractContextProvider from './contexts/ContractContext'
import MiscExpenseCostContextProvider from './contexts/MiscExpenseContext'
import GuaranteeLetterCostContextProvider from './contexts/GuaranteeLetterCostContext'
import MandayCostContextProvider from './contexts/MandayCostContext'
import UserContextProvider from './contexts/UserContext'
import ProductCostContextProvider from './contexts/ProductCostContext'
import ImplementationCostContextProvider from './contexts/ImplementationCostContext'
import AuxiliaryCostContextProvider from './contexts/AuxiliaryCostContext'
import CapitalExpenditureContextProvider from './contexts/CapitalExpenditureCostContext'

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
						
						<ProductCostContextProvider>
							<ProtectedRoute exact path='/product-cost' component={ProductCost_all} />
							<ProtectedRoute exact path='/product-cost/contract/:id' component={ProductCost_idContract} />
						</ProductCostContextProvider>

						<ImplementationCostContextProvider>
							<ProtectedRoute exact path='/implementation-cost' component={ImplementationView} />
						</ImplementationCostContextProvider>

						<UserContextProvider>
							<ProtectedRoute exact path='/user' component={User} />
						</UserContextProvider>
						
						<ContractContextProvider>
							<ProtectedRoute exact path='/contract' component={ContractView} />
							<ProtectedRoute exact path='/contract/forms' component={Inputforms} />
							<ProtectedRoute exact path='/contract/forms/:id' component={Contract_id}/>
						</ContractContextProvider>

						<CapitalExpenditureContextProvider>
							<ProductCostContextProvider>
								<ProtectedRoute exact path='/CapitalExpenditureCost' component={CapitalExpenditure} />
							</ProductCostContextProvider>
						</CapitalExpenditureContextProvider>
						
						<MiscExpenseCostContextProvider>
							<ProtectedRoute exact path='/MiscExpenseCost' component={MiscExpenseCost} />
						</MiscExpenseCostContextProvider>

						<AuxiliaryCostContextProvider>
							<ProtectedRoute exact path='/AuxiliaryCost' component={AuxiliaryCost} />
						</AuxiliaryCostContextProvider>

						<GuaranteeLetterCostContextProvider>
							<ProtectedRoute exact path='/guarantee-letter-cost' component={GuaranteeLetterCost} />{/* new */}
						</GuaranteeLetterCostContextProvider>

						<MandayCostContextProvider>
							<ProtectedRoute exact path='/manday-cost' component={MandayCostView} />
						</MandayCostContextProvider>

						<ContractContextProvider>
						<ProductCostContextProvider>
							<ProtectedRoute exact path='/summary' component={Summary}/>
							<ProtectedRoute exact path='/summary/:id' component={Summary_id}/>
						</ProductCostContextProvider>
						</ContractContextProvider>
						</>

						
					</Switch>
				</Router>
		</AuthContextProvider>
		</>
	)
}
export default App
