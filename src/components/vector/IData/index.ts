import * as t from 'io-ts';

import { QuestionIo } from '../../common/IData/question';
import { VectorIo } from './vector';

const HiddenFields = t.interface({
  answerVectors: t.array(VectorIo),
  answer: QuestionIo,
});

export const VectorDataIo = t.interface({
  question: QuestionIo,
  questionVectors: t.array(VectorIo),
  questionTextOnly: t.boolean,
  questionVectorIsNull: t.boolean,
  answer: QuestionIo,
  hiddenFields: HiddenFields,
  answerVectors: t.array(VectorIo),
  answerVectorIsNull: t.boolean,
  answerTextOnly: t.boolean,
  answerNullableVector: t.boolean,
  answerToCheck: t.number,
});

export type VectorData = t.TypeOf<typeof VectorDataIo>;

// import { Question } from '../../common/IData/question';
// import { Vector } from './vector';
//
// export interface VectorData {
//   question: Question;
//   questionVector: Vector;
//   questionTextOnly: boolean;
//   answer: Question;
// }
