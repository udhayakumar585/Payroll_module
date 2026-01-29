import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GridContainer from './GridContainer.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GridContainer >
       <payrollmodule />
    </GridContainer>
  </StrictMode>,
)
export default App;