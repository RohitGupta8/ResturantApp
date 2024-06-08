import { Container, Nav, Navbar, Form, Button, ButtonGroup, ToggleButton,NavDropdown } from 'react-bootstrap';
import logo from '../../images/logo.png';

const NavBar = ({ setCategory, setRadioValue, radioValue }) => {
  const radios = [
    { name: 'All', value: 'All',variant:'outline-warning' },
    { name: 'Veg', value: 'veg',variant:'outline-success' },
    { name: 'Non-veg', value: 'Non-veg' ,variant:'outline-danger'},
  ];

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container fluid>
        <Navbar >
          <img src={logo} alt='' width="30" height="40" style={{ marginRight: '15px' }} /> 
          <span className='logo-text'> Tim Tomatto</span>
        </Navbar>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-lg-0 nav-scroll" navbarScroll>
            <div className="nav-links-container">
              <button onClick={() => setCategory('All')} className="navbar_menu_item">All</button>
              <button onClick={() => setCategory('breakfast')} className='navbar_menu_item'>Breakfast</button>
              <button onClick={() => setCategory('mainCourse')} className='navbar_menu_item'>Main Course</button>
              <button onClick={() => setCategory('breads')} className='navbar_menu_item'>Breads</button>
              <button onClick={() => setCategory('sweets')} className='navbar_menu_item'>Sweets</button>
              <div className="radio-buttons">
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className='btn_toggle'
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={radio.variant}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      <span className='foodType'>{radio.name}</span>
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
            </div>
            <div className='dropDown'>       
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>              
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
         
          </div>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success">Search</Button>
          </Form> */}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;
