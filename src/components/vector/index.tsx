import React, { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Container from '../layout/Container/index';
import ContainerItem from '../layout/ContainerItem/index';
import Paper from '../layout/Paper/index';

import * as materialActionCreators from '../../redux/modules/material';

import { VectorData as IVectorData } from './IData/index';

import { VectorCanvas, CanvasVector } from './vectorCanvas';

import { theme } from '../style';
import EditableLabel from '../editable/label';
// import { StyledChoiceButton } from './style';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IVectorProps {
  component: any;
  currentMaterial: materialActionCreators.MaterialRedux;
  editMode: boolean;
  componentData: IVectorData;
  // redux actions
  fetchMaterial(uuid: string | undefined): void;
}

const Index: React.FC<IVectorProps> = props => {
  const { currentMaterial, editMode: editModeProp, fetchMaterial, componentData: componentDataProp } = props;
  // const textInput = createRef<HTMLInputElement>();

  // const [state, setState] = React.useState({
  //   selectedChoiceUuid: '',
  //   editMode: editMode,
  // });
  const [selectedChoiceUuid, setSelectedChoiceUuid] = useState('');
  const [editMode, setEditMode] = useState(editModeProp);

  // const { data: componentData, dispatch } = useComponentData(componentDataProp, currentMaterial);

  // TODO move to common hooks
  useEffect(() => {
    // catch parent event inside iframe
    window.addEventListener('message', ({ data }) => {
      if (data.hasOwnProperty('type')) {
        if (data.type === 'pib_edit_mode') {
          if (data.data === 'edit') {
            setEditMode(true);
          } else {
            setEditMode(false);
          }
        }
      }
      return window.removeEventListener('message', () => {});
    });
  }, []);

  useEffect(() => {
    setEditMode(editModeProp);
    if (editModeProp === false) {
      // TODO update componentData redux state
    }
  }, [editModeProp]);

  useEffect(() => {
    fetchMaterial(undefined);
  }, [fetchMaterial]);

  const onQuestionTextChange = (question: string): void => {
    // if (componentData) {
    //   dispatch({ type: 'QUESTION_CHANGE', payload: question });
    // }
  };

  const onAnswerTextChange = (answer: string): void => {
    // if (componentData) {
    //   dispatch({ type: 'QUESTION_CHANGE', payload: question });
    // }
  };

  // const onChoiceChange = (newChoice: IChoice): void => {
  //   // if (componentData) {
  //   //   dispatch({ type: 'REPLACE_DATA', payload: newChoice });
  //   //   // const choiceIndex = componentData.choices.findIndex(el => el.uuid === newChoice.uuid);
  //   //   // componentData.choices[choiceIndex] = newChoice;
  //   //   // setComponentData(componentData);
  //   // }
  // };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ flexGrow: 1, padding: '1rem' }}>
        {/*{componentData && ( // need to wait componentData*/}
        <Container>
          <ContainerItem>
            <Paper>
              <EditableLabel
                onChange={onQuestionTextChange}
                // value={question.content.text}
                value={'question'}
                editMode={editMode}
                cursorPointer={true}
              />
              <VectorCanvas
                clear={true}
                canvasId={'question'}
                // objects={objects}
                allowInput={true}
                // updateAnswer={ans => this.props.onVectorChanged(ans[1].vector.x_component, ans[1].vector.y_component)}
                // question={{ uuid: this.props.question }}
              />
              <FormControlLabel
                control={<Checkbox checked={false} onChange={() => {}} name="checkedB" color="primary" />}
                label="Question text only"
              />
              <br />
              <FormControlLabel
                control={<Checkbox checked={false} onChange={() => {}} name="checkedB" color="primary" />}
                label="Null vector"
              />
            </Paper>
          </ContainerItem>
          <ContainerItem>
            <Paper>
              <EditableLabel
                value={'answer'}
                onChange={onAnswerTextChange}
                // value={question.content.text}
                editMode={editMode}
                cursorPointer={true}
              />
              <VectorCanvas
                clear={true}
                canvasId={'answer'}
                // objects={objects}
                allowInput={true}
                // updateAnswer={ans => this.props.onVectorChanged(ans[1].vector.x_component, ans[1].vector.y_component)}
                // question={{ uuid: this.props.question }}
              />
              {/*VectorCanvas is not works for multiple components on the one page!*/}
              <br />
              <FormControlLabel
                control={<Checkbox checked={false} onChange={() => {}} name="checkedB" color="primary" />}
                label="Answer text only"
              />
              <br />
              <FormControlLabel
                control={<Checkbox checked={false} onChange={() => {}} name="checkedB" color="primary" />}
                label="Null vector"
              />
              <br />
              <FormControl>
                <InputLabel id="demo-simple-select-label">To check:</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={10} onChange={() => {}}>
                  <MenuItem value={10}>Full vector match</MenuItem>
                  <MenuItem value={20}>Magnitude only</MenuItem>
                  <MenuItem value={30}>Angle only</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </ContainerItem>
        </Container>
        {/*)}*/}
      </div>
    </ThemeProvider>
  );
};

export default connect(
  (state: any) => {
    return { currentMaterial: state.material };
  },
  dispatch => bindActionCreators(materialActionCreators, dispatch),
)(Index);
