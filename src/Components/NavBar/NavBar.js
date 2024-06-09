import {Container, Nav, Navbar, ButtonGroup, ToggleButton, NavDropdown} from 'react-bootstrap';
import logo from '../../images/logo.png';
import {useAuth} from '../../AuthProvider';
import {useState} from 'react';

const NavBar = ({setCategory, setRadioValue, radioValue, setPage, page}) => {
  const {userData} = useAuth();
  const radios = [
    {name: 'All', value: 'All', variant: 'outline-warning'},
    {name: 'Veg', value: 'veg', variant: 'outline-success'},
    {name: 'Non-veg', value: 'Non-veg', variant: 'outline-danger'},
  ];
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveCategory(category);
  };

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container fluid>
        <Navbar.Brand onClick={() => setPage('default')} className='titleHover'>
          <img src={logo} alt='' width="30" height="40" style={{marginRight: '15px'}} />
          <span className='logo-text'>Tim Tomatto</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-lg-0 nav-scroll" navbarScroll>
            {page === 'default' ? (
              <>
                <div className="nav-links-container">
                  <button
                    onClick={() => handleCategoryClick('All')}
                    className={`navbar_menu_item ${activeCategory === 'All' ? 'active' : ''}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleCategoryClick('breakfast')}
                    className={`navbar_menu_item ${activeCategory === 'breakfast' ? 'active' : ''}`}
                  >
                    Breakfast
                  </button>
                  <button
                    onClick={() => handleCategoryClick('mainCourse')}
                    className={`navbar_menu_item ${activeCategory === 'mainCourse' ? 'active' : ''}`}
                  >
                    Main Course
                  </button>
                  <button
                    onClick={() => handleCategoryClick('breads')}
                    className={`navbar_menu_item ${activeCategory === 'breads' ? 'active' : ''}`}
                  >
                    Breads
                  </button>
                  <button
                    onClick={() => handleCategoryClick('sweets')}
                    className={`navbar_menu_item ${activeCategory === 'sweets' ? 'active' : ''}`}
                  >
                    Sweets
                  </button>
                </div>
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
              </>
            ) : (
              <button onClick={() => setPage('default')} className='nav-links-container navbar_menu_item'>Home</button>
            )}
          </Nav>
          <div className='dropDown'>
            <NavDropdown

              id="nav-dropdown-dark-example"
              title={userData.name}
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={() => setPage('profile')}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setPage('change')}>Change Password</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
