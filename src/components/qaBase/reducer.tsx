import produce from 'immer';
import { QABaseData } from './IData/index';
import { uploadImage } from '../../utils/serviceRequests';

// this will add evaluatex to window
import 'evaluatex/dist/evaluatex.min.js';

declare global {
  interface Window {
    evaluatex: any;
  }
}

// import { ReducerObject as IReducerObject, ComponentsData as IComponentsData } from '../hooks/IData';

// we can have reducerData null while ajax request
export type IReducerObject = { reducerData: QABaseData | null };

// TODO add action typings
export const reducer = (state: IReducerObject, action: { type: string; payload: any }) => {
  return produce(state, (draft: { reducerData: QABaseData }) => {
    if (action.type === 'QUESTION_TEXT_CHANGE') {
      const text = action.payload;
      draft.reducerData.question.content.text = text;
      try {
        draft.reducerData.question.content.evaluatedMathText = '' + window.evaluatex(text)();
      } catch (e) {
        draft.reducerData.question.content.evaluatedMathText = '';
      }
    }
    if (action.type === 'QUESTION_HINT_CHANGE') {
      const text = action.payload;
      draft.reducerData.question.content.hint = text;
    }
    if (action.type === 'QUESTION_IMAGE_CHANGE') {
      draft.reducerData.question.content.image = action.payload.image;
    }
    if (action.type === 'ANSWER_TEXT_CHANGE') {
      const text = action.payload;
      draft.reducerData.answer.content.text = text;
      try {
        draft.reducerData.answer.content.evaluatedMathText = '' + window.evaluatex(text)();
      } catch (e) {
        draft.reducerData.answer.content.evaluatedMathText = '';
        // console.log(e);
      }
    }
    if (action.type === 'ANSWER_IMAGE_CHANGE') {
      draft.reducerData.answer.content.image = action.payload;
    }
    if (action.type === 'REPLACE_DATA') {
      draft.reducerData = action.payload;
    }
  });
};
