/** @format */

import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import FormGroupInput from "./FormGroupInput";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const FormClassify = ({ data }) => {
  console.log(data);
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

  useEffect(() => {
    if (data && data?.length > 0) {
      setInputField(data);
    } else {
      setInputField([]);
    }
  }, [data]);

  console.log(inputField);

  const handleUpdateClassificationGroup = (index, fieldName, value) => {
    const updatedFields = inputField.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [fieldName]: value,
        };
      }
      return item;
    });
    setInputField(updatedFields);
  };

  return (
    <>
      {inputField?.map((item, index) => (
        <div
          className="grid items-center w-full grid-cols-3 gap-5 grid-container"
          key={index}
        >
          <FormGroupInput
            name="cla_group"
            id="cla_group"
            value={item.cla_group}
            placeholder={`Classifycation group ${index + 1}, eg: color etc`}
            onChange={(event) =>
              handleUpdateClassificationGroup(
                index,
                "cla_group",
                event.target.value
              )
            }
          ></FormGroupInput>
          <FormGroupInput
            name="cla_name"
            id="cla_name"
            value={item.cla_name}
            placeholder="Product classification, eg: White, Red etc"
            onChange={(event) =>
              handleUpdateClassificationGroup(
                index,
                "cla_name",
                event.target.value
              )
            }
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
