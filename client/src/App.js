import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import ProtectedRoute from './components/routing/ProtectedRoute'
//====== Components

import Auth from './views/Auth'
import User from './views/User'
import {Summary,Summary_id} from './views/SummaryView'
import {InputForm} from './views/InputForm'
import { ContractView,Inputforms,Contract_id} from './views/ContractView'


import {ProductCost_all,ProductCost_idContract} from './views/ProductCostView'
import {MandayCost_all,MandayCost_idContract} from './views/MandayCostView'
import {GuaranteeLetterCost_all, GuaranteeLetterCost_idContract} from './views/GuaranteeLetterCostView'
import {MiscExpenseCost_all,MiscExpenseCost_byidContract} from './views/MiscExpenseCostView'
import {CapitalExpenditureCost_all,CapitalExpenditureCost_byidContract} from './views/CapitalExpenditureCostView'
import {ImplementationCost,ImplementationCost_byidContract} from './views/ImplementationCostView'

import {AuxiliaryCost_all,AuxiliaryCost_byidContract,AuxiliaryCost_Plan} from './views/AuxiliaryCostView'
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
						
						<ContractContextProvider>
						<ImplementationCostContextProvider>
							<ProtectedRoute exact path='/implementation-cost' component={ImplementationCost} />
							<ProtectedRoute exact path='/implementation-cost/contract/:id' component={ImplementationCost_byidContract} />
						</ImplementationCostContextProvider>
						</ContractContextProvider>

						
						<UserContextProvider>
							<ProtectedRoute exact path='/user' component={User} />
						</UserContextProvider>
						
						<ContractContextProvider>
							<ProtectedRoute exact path='/contract' component={ContractView} />
							<ProtectedRoute exact path='/contract/forms' component={Inputforms} />
							<ProtectedRoute exact path='/contract/forms/:id' component={Contract_id}/>
						</ContractContextProvider>

						<ProductCostContextProvider>
						<CapitalExpenditureContextProvider>
								<ProtectedRoute exact path='/CapitalExpenditureCost' component={CapitalExpenditureCost_all} />
								<ProtectedRoute exact path='/CapitalExpenditureCost/contract/:id' component={CapitalExpenditureCost_byidContract} />
						</CapitalExpenditureContextProvider>
						</ProductCostContextProvider>

						<MiscExpenseCostContextProvider>
							<ProtectedRoute exact path='/MiscExpenseCost' component={MiscExpenseCost_all} /> 
							<ProtectedRoute exact path='/MiscExpenseCost/contract/:id' component={MiscExpenseCost_byidContract} />
						</MiscExpenseCostContextProvider>

						<ProductCostContextProvider>
						<AuxiliaryCostContextProvider>
							<ProtectedRoute exact path='/AuxiliaryCost' component={AuxiliaryCost_all} />
							<ProtectedRoute exact path='/AuxiliaryCost/contract/:id' component={AuxiliaryCost_Plan} />
							<ProtectedRoute exact path='/AuxiliaryCost/contract/:id/plan' component={AuxiliaryCost_byidContract} />
						</AuxiliaryCostContextProvider>
						</ProductCostContextProvider>

						<GuaranteeLetterCostContextProvider>
							<ProtectedRoute exact path='/guarantee-letter-cost' component={GuaranteeLetterCost_all} />
							<ProtectedRoute exact path='/guarantee-letter-cost/contract/:id' component={GuaranteeLetterCost_idContract} />
						</GuaranteeLetterCostContextProvider>

						<ContractContextProvider>
						<MandayCostContextProvider>
							<ProtectedRoute exact path='/manday-cost' component={MandayCost_all} />
							<ProtectedRoute exact path='/manday-cost/contract/:id' component={MandayCost_idContract}/>
						</MandayCostContextProvider>
						</ContractContextProvider>

						<ImplementationCostContextProvider>
						<AuxiliaryCostContextProvider>
						<CapitalExpenditureContextProvider>
						<MiscExpenseCostContextProvider>
						<GuaranteeLetterCostContextProvider>
						<MandayCostContextProvider>
						<ContractContextProvider>
						<ProductCostContextProvider>
							<ProtectedRoute exact path='/summary' component={Summary}/>
							<ProtectedRoute exact path='/summary/:id' component={Summary_id}/>
							<ProtectedRoute exact path='/inputform/:id' component={InputForm}/>
						</ProductCostContextProvider>
						</ContractContextProvider>
						</MandayCostContextProvider>
						</GuaranteeLetterCostContextProvider>
						</MiscExpenseCostContextProvider>
						</CapitalExpenditureContextProvider>
						</AuxiliaryCostContextProvider>
						</ImplementationCostContextProvider>

						</>

						
					</Switch>
				</Router>
		</AuthContextProvider>
		</>
	)
}
export default App
