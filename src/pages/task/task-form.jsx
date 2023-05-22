import React, { useContext, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import {
  Form,
  FormGroup,
  NumberInput,
  Repeater,
  Select,
  TextAreaInput,
  TextInput
} from '../../components';
import { DataContext, useFind, useSave, useUpdate } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  overflow: auto;
`;

const RepeaterItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  margin: 0px;
`;

const StackLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;

const DefaultTask = {
  title: {
    value: '',
    errorMessage: ''
  },
  description: {
    value: '',
    errorMessage: ''
  },
  points: {
    value: '',
    errorMessage: ''
  },
  methodName: {
    value: '',
    errorMessage: ''
  },
  language: {
    value: '',
    errorMessage: ''
  },
  returnType: {
    value: '',
    errorMessage: ''
  },
  methodArguments: [
    {
      name: {
        value: '',
        errorMessage: ''
      },
      type: {
        value: '',
        errorMessage: ''
      }
    }
  ],
  testCases: [
    {
      inputs: [{ name: '', type: '', value: '', errorMessage: '' }],
      output: {
        value: '',
        errorMessage: ''
      }
    }
  ]
};

const languages = [
  {
    text: 'Java',
    value: 'java'
  },
  {
    text: 'Python',
    value: 'python'
  }
];

const types = [
  {
    text: 'int',
    value: 'int'
  },
  {
    text: 'double',
    value: 'double'
  },
  {
    text: 'string',
    value: 'string'
  },
  {
    text: 'int[]',
    value: 'int[]'
  },
  {
    text: 'double[]',
    value: 'double[]'
  },
  {
    text: 'string[]',
    value: 'string[]'
  }
];

const TaskForm = (props) => {
  const dataContext = useContext(DataContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    role = jwtDecode(token).authorities;
  }

  if (role && role === dataContext.ROLES.USER) {
    navigate('/');
  }

  const { id } = useParams();

  const [task, setTask] = useState(DefaultTask);

  const {
    response: saveResponse,
    loading: saveloading,
    save
  } = useSave(`${dataContext.API}/task/create`);

  const {
    response: updateResponse,
    loading: updateloading,
    update
  } = useUpdate(`${dataContext.API}/task/edit/{id}`);

  const { response: getTaskResponse, find: getTask } = useFind(
    `${dataContext.API}/task/getTask/{id}`
  );

  useEffect(() => {
    if (id && id !== 'new') {
      const config = {
        headers: {
          Authorization: token
        }
      };
      const additionalURLParams = [
        {
          name: 'id',
          value: id
        }
      ];
      getTask(config, additionalURLParams);
    }
  }, [id]);

  useEffect(() => {
    if (getTaskResponse?.data) {
      const task = getTaskResponse.data;
      setTask({
        title: {
          value: task.title,
          errorMessage: ''
        },
        description: {
          value: task.description,
          errorMessage: ''
        },
        points: {
          value: task.points,
          errorMessage: ''
        },
        methodName: {
          value: task.methodName,
          errorMessage: ''
        },
        language: {
          value: task.language,
          errorMessage: ''
        },
        returnType: {
          value: task.returnType,
          errorMessage: ''
        },
        methodArguments: task.methodArguments?.map((argument, index) => ({
          name: {
            value: argument,
            errorMessage: ''
          },
          type: {
            value: task.methodArgumentTypes[index],
            errorMessage: ''
          }
        })),
        testCases: task.inputOutput?.map((x) => ({
          inputs: x[0].split(';').map((input, index) => ({
            name: task.methodArguments[index],
            type: task.methodArgumentTypes[index],
            value: input,
            errorMessage: ''
          })),
          output: {
            value: x[1],
            errorMessage: ''
          }
        }))
      });
    }
  }, [getTaskResponse]);

  const handleChange = (e) => {
    if (e.target.name.startsWith('methodArguments')) {
      const indexes = e.target.name.match(/(?<=\[)[^\][]*(?=])/g);
      const index = indexes[0];
      if (index) {
        const methodArguments = [...task.methodArguments];
        if (e.target.name.endsWith('name')) {
          methodArguments[index].name.value = e.target.value;
          methodArguments[index].name.errorMessage = '';
        } else if (e.target.name.endsWith('type')) {
          methodArguments[index].type.value = e.target.value;
          methodArguments[index].type.errorMessage = '';
        }
        const testCases = [...task.testCases];
        testCases?.forEach((testCase) => {
          testCase.inputs?.forEach((testCaseInput, testCaseInputIndex) => {
            testCaseInput.name = methodArguments[testCaseInputIndex].name.value;
            testCaseInput.type = methodArguments[testCaseInputIndex].type.value;
          });
        });
        setTask({
          ...task,
          methodArguments: methodArguments,
          testCases: testCases
        });
      }
    } else if (e.target.name.startsWith('testCases')) {
      const indexes = e.target.name.match(/(?<=\[)[^\][]*(?=])/g);
      const index = indexes[0];
      if (index) {
        const testCases = [...task.testCases];
        if (e.target.name.includes('inputs')) {
          const inputIndex = indexes[1];
          if (inputIndex) {
            testCases[index].inputs[inputIndex].value = e.target.value;
            testCases[index].inputs[inputIndex].errorMessage = '';
          }
        } else if (e.target.name.includes('output')) {
          testCases[index].output.value = e.target.value;
          testCases[index].output.errorMessage = '';
        }
        setTask({
          ...task,
          testCases: testCases
        });
      }
    } else {
      setTask({
        ...task,
        [e.target.name]: {
          value: e.target.value,
          errorMessage: ''
        }
      });
    }
  };

  useEffect(() => {
    if (saveResponse?.status === 201) {
      props.setSnackbar({
        color: theme.colors.DarkGreen,
        message: 'Task created'
      });
      props.snackbarRef.current.show();
      navigate(-1);
    }
  }, [saveResponse]);

  useEffect(() => {
    if (updateResponse?.status === 200) {
      props.setSnackbar({
        color: theme.colors.DarkGreen,
        message: 'Task updated'
      });
      props.snackbarRef.current.show();
      navigate(-1);
    }
  }, [updateResponse]);

  const checkForErrors = () => {
    let hasErrors = false;
    const validationErrors = [];

    if (task.title?.value === '') {
      validationErrors.push({
        propertyName: 'title',
        errorMessage: 'Required'
      });
    }

    if (task.points?.value === '') {
      validationErrors.push({
        propertyName: 'points',
        errorMessage: 'Required'
      });
    } else if (task.points.value < 5 || task.points.value > 100) {
      validationErrors.push({
        propertyName: 'points',
        errorMessage: 'Please enter a valid value in range [5; 100]'
      });
    }

    if (task.description?.value === '') {
      validationErrors.push({
        propertyName: 'description',
        errorMessage: 'Required'
      });
    }

    if (task.methodName?.value === '') {
      validationErrors.push({
        propertyName: 'methodName',
        errorMessage: 'Required'
      });
    }

    if (task.language?.value === '') {
      validationErrors.push({
        propertyName: 'language',
        errorMessage: 'Required'
      });
    }

    if (task.returnType?.value === '') {
      validationErrors.push({
        propertyName: 'returnType',
        errorMessage: 'Required'
      });
    }

    task.methodArguments?.forEach((argument, index) => {
      if (argument.name.value === '') {
        validationErrors.push({
          propertyName: `methodArguments[${index}].name`,
          errorMessage: 'Required'
        });
      }
      if (argument.type.value === '') {
        validationErrors.push({
          propertyName: `methodArguments[${index}].type`,
          errorMessage: 'Required'
        });
      }
    });

    task.testCases?.forEach((testCase, index) => {
      testCase.inputs?.forEach((input, inputIndex) => {
        if (input.value === '') {
          validationErrors.push({
            propertyName: `testCases[${index}].inputs[${inputIndex}]`,
            errorMessage: 'Required'
          });
        }
      });
      if (testCase.output.value === '') {
        validationErrors.push({
          propertyName: `testCases[${index}].output`,
          errorMessage: 'Required'
        });
      }
    });

    if (validationErrors.length > 0) {
      hasErrors = true;
      mapErrors(validationErrors);
    }

    return hasErrors;
  };

  const mapErrors = (validationErrors) => {
    let updatedTask = { ...task };

    validationErrors.forEach((error) => {
      if (error.propertyName.startsWith('methodArguments')) {
        const indexes = error.propertyName.match(/(?<=\[)[^\][]*(?=])/g);
        const index = indexes[0];
        if (index) {
          const methodArguments = [...updatedTask.methodArguments];
          if (error.propertyName.endsWith('name')) {
            methodArguments[index].name.errorMessage = error.errorMessage;
          } else if (error.propertyName.endsWith('type')) {
            methodArguments[index].type.errorMessage = error.errorMessage;
          }
        }
      } else if (error.propertyName.startsWith('testCases')) {
        const indexes = error.propertyName.match(/(?<=\[)[^\][]*(?=])/g);
        const index = indexes[0];
        if (index) {
          const testCases = [...task.testCases];
          if (error.propertyName.includes('inputs')) {
            const inputIndex = indexes[1];
            if (inputIndex) {
              testCases[index].inputs[inputIndex].errorMessage =
                error.errorMessage;
            }
          } else if (error.propertyName.includes('output')) {
            testCases[index].output.errorMessage = error.errorMessage;
          }
        }
      } else {
        updatedTask = {
          ...updatedTask,
          [error.propertyName]: {
            ...updatedTask[error.propertyName],
            errorMessage: error.errorMessage
          }
        };
      }
    });

    setTask(updatedTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = checkForErrors();

    if (!hasErrors) {
      const request = {
        title: task.title.value,
        description: task.description.value,
        points: task.points.value,
        methodName: task.methodName.value,
        methodArguments: task.methodArguments.map(
          (argument) => argument.name.value
        ),
        methodArgumentTypes: task.methodArguments.map(
          (argument) => argument.type.value
        ),
        language: task.language.value,
        returnType: task.returnType.value,
        inputOutput: task.testCases.map((testCase) => {
          let inputs = '';
          testCase.inputs.forEach((input, index) => {
            if (index !== 0) {
              inputs += ';';
            }
            inputs += `${input.value}`;
          });
          return [inputs, testCase.output.value];
        })
      };
      const config = {
        headers: {
          Authorization: token
        }
      };
      if (id && id !== 'new') {
        const additionalURLParams = [
          {
            name: 'id',
            value: id
          }
        ];
        update(request, config, additionalURLParams);
      } else {
        save(request, config);
      }
    }
  };

  const addMethodArgument = () => {
    const methodArguments = [...task.methodArguments];
    methodArguments.push({
      name: {
        value: '',
        errorMessage: ''
      },
      type: {
        value: '',
        errorMessage: ''
      }
    });
    const testCases = [...task.testCases];
    testCases?.forEach((testCase, index) => {
      testCase.inputs?.push({
        name: methodArguments[index].name.value,
        type: methodArguments[index].type.value,
        value: '',
        errorMessage: ''
      });
    });

    setTask({
      ...task,
      methodArguments: methodArguments,
      testCases: testCases
    });
  };

  const removeMethodArgument = (index) => {
    const methodArguments = [...task.methodArguments];
    methodArguments.splice(index, 1);

    const testCases = [...task.testCases];
    testCases.splice(index, 1);
    testCases?.forEach((testCase, index) => {
      testCase.inputs?.splice(index, 1);
      testCase.inputs?.forEach((testCaseInput, testCaseInputIndex) => {
        testCaseInput.name = methodArguments[testCaseInputIndex].name.value;
        testCaseInput.type = methodArguments[testCaseInputIndex].type.value;
      });
    });

    setTask({
      ...task,
      methodArguments: methodArguments,
      testCases: testCases
    });
  };

  const addTestCase = () => {
    const testCases = [...task.testCases];
    const testCaseInputs = [];
    task.methodArguments?.forEach((argument) => {
      testCaseInputs.push({
        name: argument.name.value,
        type: argument.type.value,
        value: '',
        errorMessage: ''
      });
    });
    testCases.push({
      inputs: testCaseInputs,
      output: {
        value: '',
        errorMessage: ''
      }
    });
    setTask({
      ...task,
      testCases: testCases
    });
  };

  const removeTestCase = (index) => {
    const testCases = [...task.testCases];
    testCases.splice(index, 1);
    setTask({
      ...task,
      testCases: testCases
    });
  };

  return (
    <Container>
      <Form
        title='Create task'
        onSubmit={handleSubmit}
        saveloading={saveloading || updateloading}
      >
        <StackLayout>
          <FormGroup>
            <TextInput
              label='Title'
              name='title'
              size='md'
              value={task.title?.value}
              onChange={handleChange}
              required
              errorMessage={task.title?.errorMessage}
            />
            <NumberInput
              label='Points'
              name='points'
              size='md'
              value={task.points?.value}
              onChange={handleChange}
              required
              errorMessage={task.points?.errorMessage}
            />
          </FormGroup>
          <FormGroup>
            <TextAreaInput
              label='Description'
              name='description'
              height='64px'
              size='xl'
              value={task.description?.value}
              onChange={handleChange}
              required
              errorMessage={task.description?.errorMessage}
            />
          </FormGroup>
          <FormGroup justifyContent='start'>
            <TextInput
              label='Method Name'
              name='methodName'
              size='lg'
              required
              value={task.methodName?.value}
              onChange={handleChange}
              errorMessage={task.methodName?.errorMessage}
            />
          </FormGroup>
          <FormGroup>
            <Select
              title='Language'
              label='Language'
              name='language'
              size='md'
              defaultOptionText='Select a language'
              value={task.language?.value}
              onChange={handleChange}
              errorMessage={task.language?.errorMessage}
              options={languages}
              required
            />
            <Select
              title='Return Type'
              label='Return Type'
              name='returnType'
              size='md'
              defaultOptionText='Select a return type'
              value={task.returnType?.value}
              onChange={handleChange}
              errorMessage={task.returnType?.errorMessage}
              options={types}
              required
            />
          </FormGroup>
          <FormGroup justifyContent='start'>
            <Repeater
              label='Method Arguments'
              addButtonText='Add Argument'
              onAdd={addMethodArgument}
              onRemove={removeMethodArgument}
              firstItemRequired={true}
            >
              {task.methodArguments?.map((argument, index) => (
                <RepeaterItemContainer key={index}>
                  <TextInput
                    label='Name'
                    size='sm'
                    name={`methodArguments[${index}].name`}
                    placeholder='Name'
                    value={argument.name.value}
                    onChange={handleChange}
                    errorMessage={argument.name.errorMessage}
                    required
                  />
                  <Select
                    title='Type'
                    label='Type'
                    size='sm'
                    name={`methodArguments[${index}].type`}
                    defaultOptionText='Select a type'
                    value={argument.type.value}
                    onChange={handleChange}
                    errorMessage={argument.type.errorMessage}
                    options={types}
                    required
                  />
                </RepeaterItemContainer>
              ))}
            </Repeater>
          </FormGroup>
          <FormGroup justifyContent='start'>
            <Repeater
              label='Test Cases'
              addButtonA='Add Test Case'
              onAdd={addTestCase}
              onRemove={removeTestCase}
              firstItemRequired={true}
            >
              {task.testCases?.map((testCase, testCaseIndex) => (
                <RepeaterItemContainer key={testCaseIndex}>
                  <StackLayout key={testCaseIndex}>
                    {testCase.inputs?.map((input, inputIndex) =>
                      ['int', 'double'].includes(input.type) ? (
                        <NumberInput
                          key={inputIndex}
                          label={
                            `${input.name}: ${input.type}` || 'Argument not set'
                          }
                          name={`testCases[${testCaseIndex}].inputs[${inputIndex}]`}
                          size='sm'
                          placeholder='Input'
                          value={input.value}
                          onChange={handleChange}
                          errorMessage={input.errorMessage}
                          required
                        />
                      ) : (
                        <TextInput
                          key={inputIndex}
                          label={
                            `${input.name}: ${input.type}` || 'Argument not set'
                          }
                          name={`testCases[${testCaseIndex}].inputs[${inputIndex}]`}
                          size='sm'
                          placeholder='Input'
                          value={input.value}
                          onChange={handleChange}
                          errorMessage={input.errorMessage}
                          required
                        />
                      )
                    )}
                  </StackLayout>
                  {['int', 'double'].includes(task.returnType.value) ? (
                    <NumberInput
                      label={
                        `Output: ${task.returnType.value}` || 'No return type'
                      }
                      name={`testCases[${testCaseIndex}].output`}
                      size='sm'
                      placeholder='Output'
                      value={testCase.output.value}
                      onChange={handleChange}
                      errorMessage={testCase.output.errorMessage}
                      required
                    />
                  ) : (
                    <TextInput
                      label={
                        `Output: ${task.returnType.value}` || 'No return type'
                      }
                      name={`testCases[${testCaseIndex}].output`}
                      size='sm'
                      placeholder='Output'
                      value={testCase.output.value}
                      onChange={handleChange}
                      errorMessage={testCase.output.errorMessage}
                      required
                    />
                  )}
                </RepeaterItemContainer>
              ))}
            </Repeater>
          </FormGroup>
        </StackLayout>
      </Form>
    </Container>
  );
};

export default TaskForm;
