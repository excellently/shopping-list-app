import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './HomePage.scss';

class HomePage extends Component {
  render() {
    return (
      <Container>
        <Row className='justify-content-center'>
          <Jumbotron className='home col-10 pt-5 text-center'>
            <h1 className='display-4'>Желаете составить список покупок?</h1>
            <p className='lead'>Приложение «Список покупок» поможет скупиться в магазине.
            Пользователи с легкостью смогут создавать списки покупок и управлять ими.</p>
            <hr className='my-2' />
            <p>Возможности приложения: добавление, удаление, фильтрация, отображение, пометка купленным,
            навешивание ярлыков, сортировка списка, работа с несколькими списками покупок.</p>
            <p className='lead'>
              <LinkContainer exact to='/shopping-lists'>
                <Button size='lg' color='primary'>Начать</Button>
              </LinkContainer>
            </p>
          </Jumbotron>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
