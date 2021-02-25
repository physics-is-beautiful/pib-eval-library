import React, { useEffect, useReducer } from 'react';

import { isRight } from 'fp-ts/lib/Either';

import { QABaseData as IQABaseData, QABaseDataIo } from './IData/index';

import { IReducerObject, reducer } from './reducer';

import { mockQaBase } from './mockData';

import { uploadImage } from '../../utils/serviceRequests';

export function useComponentData(componentData: IQABaseData | undefined, currentMaterial: any) {
  const initialState: IReducerObject = { reducerData: null };
  const [data, dispatch] = useReducer(reducer, initialState);

  useEffect((): void => {
    let initialData: IQABaseData | null = null;

    // TODO notify user if isRight!=true
    if (currentMaterial && currentMaterial.data) {
      // set component data from loaded currentMaterial
      // validate data structure from API with io-ts model
      if (isRight(QABaseDataIo.decode(currentMaterial.data))) {
        initialData = currentMaterial.data;
      } else {
        // bad data structure - generate a new empty one
        // TODO we need try to copy all possible fields data from old json structure
        initialData = mockQaBase;
      }
    } else if (componentData) {
      // set component data from component props
      initialData = componentData;
    }

    // initialData = data from component props | currentMaterial.data
    if (initialData) {
      if (!currentMaterial.isFetching) {
        dispatch({ type: 'REPLACE_DATA', payload: initialData });
      } else {
        // if is fetching from server process - reset current
        dispatch({ type: 'REPLACE_DATA', payload: null });
      }
    }
  }, [componentData, currentMaterial]);

  const operateDataFunctions = getOperateDataFunctions(dispatch);

  return { data: data.reducerData, operateDataFunctions };
}

function getOperateDataFunctions(dispatch: any) {
  const onQuestionTextChange = (text: string): void => {
    dispatch({ type: 'QUESTION_TEXT_CHANGE', payload: text });
  };

  const onQuestionHintChange = (image: string): void => {
    dispatch({ type: 'QUESTION_HINT_CHANGE', payload: image });
  };

  const onQuestionImageChange = (image: any, materialUuid: string): void => {
    // dispatch({ type: 'QUESTION_IMAGE_CHANGE', payload: { image, materialUuid } });
    uploadImage(image, materialUuid).then((response: any) => {
      dispatch({ type: 'QUESTION_IMAGE_CHANGE', payload: response });
    });
  };

  const onAnswerTextChange = (text: string): void => {
    dispatch({ type: 'ANSWER_TEXT_CHANGE', payload: text });
  };

  const onAnswerImageChange = (image: string, materialUuid: string): void => {
    // dispatch({ type: 'ANSWER_IMAGE_CHANGE', payload: image });
    uploadImage(image, materialUuid).then((response: any) => {
      dispatch({ type: 'QUESTION_IMAGE_CHANGE', payload: response });
    });
  };

  return { onQuestionTextChange, onQuestionHintChange, onQuestionImageChange, onAnswerTextChange, onAnswerImageChange };
}
