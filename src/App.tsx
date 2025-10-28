import { Route, Switch } from 'wouter'
import Navigation from './components/Navigation'
import AddWords from './pages/AddWords'
import ManageTags from './pages/ManageTags'
import Practice from './pages/Practice'

function App() {

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Practice} />
        <Route path="/add-words" component={AddWords} />
        <Route path="/manage-tags" component={ManageTags} />
      </Switch>
    </>
  )
}

export default App
