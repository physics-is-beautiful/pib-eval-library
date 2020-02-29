import React, { createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Container from '../layout/Container/index';
import ContainerItem from '../layout/ContainerItem/index';
import Paper from '../layout/Paper/index';

import * as materialActionCreators from '../../redux/modules/material';

import Question from './question';
import Choice from './choice';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IChoicesProps {
  component: any;
  currentMaterial: materialActionCreators.MaterialRedux;
  fetchMaterial(uuid: string | undefined): void;
  editMode: boolean;
}

const Index: React.FC<IChoicesProps> = props => {
  const { currentMaterial, fetchMaterial, editMode } = props;
  // const textInput = createRef<HTMLInputElement>();
  // function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
  //
  // }

  useEffect(() => {
    fetchMaterial(undefined);
  }, []);

  return (
    <div style={{ flexGrow: 1, padding: '1rem' }}>
      <Container>
        <ContainerItem>
          <Paper>
            <Question material={currentMaterial} />
          </Paper>
        </ContainerItem>
        <ContainerItem>
          <Paper>
            editMode: {editMode.toString()}
            {currentMaterial && currentMaterial.data && currentMaterial.data.choices ? (
              <React.Fragment>
                {currentMaterial.data.choices.map((choice, index) => {
                  return <Choice key={choice.uuid} index={index} choice={choice} />;
                })}
              </React.Fragment>
            ) : null}
          </Paper>
        </ContainerItem>
      </Container>
    </div>
  );
};

export default connect(
  (state: any) => {
    return { currentMaterial: state.material };
  },
  dispatch => bindActionCreators(materialActionCreators, dispatch),
)(Index);
