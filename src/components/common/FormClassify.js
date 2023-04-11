/** @format */

import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import FormGroupInput from "./FormGroupInput";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const FormClassify = () => {
  const [inputField, setInputField] = useState([]);

  const addClasificationGroup = () => {
    if (inputField.length < 2)
      setInputField([...inputField, { cla_group: "", cla_name: "" }]);
  };

  const handleDeleteClassificationGroup = (index) => {
    const values = [...inputField];
    values.splice(index, 1);
    setInputField(values);
  };

  return (
    <>
      {inputField.map((item, index) => (
        <div
          className="grid items-center w-full grid-cols-3 gap-5 grid-container"
          key={index}
        >
          <FormGroupInput
            // label={`Classifycation group ${index + 1}`}
            name="cla_group"
            id="cla_group"
            placeholder={`Classifycation group ${index + 1}, eg: color etc`}
          ></FormGroupInput>
          <FormGroupInput
            // label="Product classification"
            name="cla_name"
            id="cla_name"
            placeholder="Product classification, eg: White, Red etc"
          ></FormGroupInput>
          <RemoveCircleIcon
            className="cursor-pointer"
            color="red"
            onClick={() => handleDeleteClassificationGroup(index)}
          ></RemoveCircleIcon>
        </div>
      ))}
      {inputField.length < 2 && (
        <Button
          variant="contained"
          color="secondary"
          className="w-[250px]"
          onClick={addClasificationGroup}
        >
          add taxonomy group
          <AddIcon className="ml-2"></AddIcon>
        </Button>
      )}
    </>
  );
};

export default withErrorBoundary(FormClassify, {
  FallbackComponent: ErrorComponent,
});
