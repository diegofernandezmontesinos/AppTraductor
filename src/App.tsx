import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGES } from './constant'
import { ArrowsIcon } from './components/Iconos'
import { LanguageSelector } from './components/LanguageSelector'



function App() {

  const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()

 
  return (
    <Container fluid>

      <h1>DFM Translate</h1>

      <Row>
        <Col>
          <LanguageSelector 
          type = 'from'
          value={fromLanguage}
          onChange={setFromLanguage} /> 
        </Col>

        <Col>
          <Button variant="link" disabled={fromLanguage == AUTO_LANGUAGES} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>


        <Col>
        <LanguageSelector 
        type= 'to'
        value = {toLanguage}
        onChange ={setToLanguage}/> 
        </Col>
      </Row>
    </Container>
  )
}

export default App
