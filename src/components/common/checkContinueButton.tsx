import React, { useState, useEffect } from 'react';

import { Material } from '../../models/';

import Button from '@material-ui/core/Button';
import { checkSaveButtonStyle, checkSaveButtonStyleDisabled } from './style';
import * as materialActionCreators from '../../redux/modules/material';
import { QAData as IQAData } from '../qaChoices/IData/index';
import { VectorData as IVectorData } from '../vector/IData/index';
import { UnitConversionData as IUnitConversionData } from '../unitConversion/IData/index';
import { QABaseData as IQABaseData } from '../qaBase/IData/index';
import { MySQLData as IMySQLData } from '../mysql/IData/index';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface CheckContinueProps {
  currentMaterial: materialActionCreators.MaterialRedux;
  editMode: boolean | undefined;
  disabledCheck: boolean;
  updateMaterial(material: Material): void;
  moveToNextComponent(previousMaterialUuid: string): void;
  checkUserMaterialReaction(material: Material): void;
  componentData: IQAData | IVectorData | IQABaseData | IUnitConversionData | IMySQLData | IMySQLData | null; // Any component IData
  userReactionState: string; // todo enum?
}

const CheckContinueButton: React.FC<CheckContinueProps> = props => {
  const {
    currentMaterial,
    editMode,
    disabledCheck,
    updateMaterial,
    checkUserMaterialReaction,
    componentData,
    userReactionState,
    moveToNextComponent,
  } = props;

  const handleSaveDataClick = () => {
    const material: Material = { uuid: currentMaterial.uuid, data: componentData };
    updateMaterial(material);
  };

  const handleCheckClick = () => {
    const material: Material = { uuid: currentMaterial.uuid, data: componentData };
    checkUserMaterialReaction(material);
  };

  const handleContinueClick = () => {
    if (currentMaterial.uuid) {
      moveToNextComponent(currentMaterial.uuid);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {currentMaterial && editMode ? (
        <Button style={checkSaveButtonStyle} variant="contained" color="primary" onClick={handleSaveDataClick}>
          Save
        </Button>
      ) : (
        <Button
          disabled={disabledCheck}
          style={disabledCheck ? checkSaveButtonStyleDisabled : checkSaveButtonStyle}
          variant="contained"
          color="primary"
          onClick={userReactionState === 'start' ? handleCheckClick : handleContinueClick}
        >
          {userReactionState === 'start' && 'Check'}
          {userReactionState === 'checked' && 'Continue'}
        </Button>
      )}
    </div>
  );
};

export default CheckContinueButton;
