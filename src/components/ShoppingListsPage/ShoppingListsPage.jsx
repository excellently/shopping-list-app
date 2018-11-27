import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import GridContainer from '../../containers/GridContainer';

import './ShoppingListsPage.scss';

class ShoppingListsPage extends Component {
  render() {
    return (
      <Container>
        <Row className='justify-content-center'>
          <GridContainer />
        </Row>
      </Container>
    );
  }
}

export default ShoppingListsPage;
