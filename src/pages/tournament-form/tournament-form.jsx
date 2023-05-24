import React, { useContext, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Form,
    FormGroup,
    NumberInput,
    Repeater,
    Select,
    TextAreaInput,
    TextInput
} from '../../components';
import { DataContext, useUpdate, useFind, useSave } from '../../utils';

const Container = styled.div`
  height: calc(100% - ${(props) => props.topBar?.offsetHeight || 0}px);
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

export const DefaultTournament = {
    name: {
        value: '',
        errorMessage: ''
    },
    description: {
        value: '',
        errorMessage: ''
    },
    endDate: {
        value: '',
        errorMessage: ''
    },
    firstPlacePoints: {
        value: '',
        errorMessage: ''
    },
    difficulty: {
        value: '',
        errorMessage: ''
    },
    secondPlacePoints: {
        value: '',
        errorMessage: ''
    },
    startDate: {
        value: '',
        errorMessage: ''
    },
    thirdPlacePoints: {
        value: '',
        errorMessage: ''
    }
};

const difficulty = [
    {
        text: 'Easy',
        value: 'Beginner'
    },
    {
        text: 'Medium',
        value: 'Intermediate'
    },
    {
        text: 'Hard',
        value: 'Expert'
    }
];

const TournamentForm = (props) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const dataContext = useContext(DataContext);
    const topBar = document.getElementById('topBar');
    const token = localStorage.getItem('token');
    const [tournament, setTournament] = useState(DefaultTournament);
    const { response, loading, error, update, clearError } = useUpdate(`${dataContext.API}/tournament/edit/${id}`);
    const { response: findTasksResponse, find: findTasks } = useFind(`${dataContext.API}/task/getByTournament/${id}`);
    const { response: findTournamentResponse, find: findTournament } = useFind(`${dataContext.API}/tournament/get/${id}`);
    const { response: findAllTasksResponse, find: findAllTasks } = useFind(`${dataContext.API}/task/getAll`);
    const { response: saveResponse, loading: saveLoading, save } = useSave(`${dataContext.API}/tournament/create`);


    useEffect(() => {
        if (saveResponse?.status === 200) {
            props.setSnackbar({
                color: theme.colors.DarkGreen,
                message: 'Tournament created successfully!'
            });
            props.snackbarRef.current.show();
            navigate('/tournaments');
        }
    }, [saveResponse]);


    useEffect(() => {
        find();
    }, []);

    useEffect(() => {
        if (response?.data) {
            setTournament(response.data);
        }
    }, [response]);
    const [tasks, setTasks] = useState([]);
    const [taskTitles, setTaskTitles] = useState([]);

    const handleChange = (e) => {
        if (e.target.name.startsWith('title')) {
            const indexes = e.target.name.match(/(?<=\[)[^\][]*(?=])/g);
            const index = parseInt(indexes[0], 10);

            if (index >= 0) {
                let updatedTasks = [...tasks];
                if (updatedTasks[index]) {
                    updatedTasks[index].title.value = e.target.value;
                    updatedTasks[index].title.errorMessage = '';
                } else {
                    updatedTasks.push({
                        title: {
                            value: e.target.value,
                            errorMessage: ''
                        }
                    });
                }
                setTasks(updatedTasks);
            }
        } else {
            setTournament({
                ...tournament,
                [e.target.name]: {
                    value: e.target.value,
                    errorMessage: ''
                }
            });
        }

        if (error) {
            clearError();
        }
    };
    useEffect(() => {
        findAllTasks({
            headers: {
                Authorization: token
            }
        });
    }, []);

    useEffect(() => {
        if (findAllTasksResponse?.data) {
            const taskTitles = findAllTasksResponse.data.map((task) => ({
                text: task.title,
                value: task.id
            }));
            setTaskTitles(taskTitles);
        }
    }, [findAllTasksResponse]);

    useEffect(() => {
        if (id && id !== 'new') {
            findTasks({
                headers: {
                    Authorization: token
                }
            })
        }
    }, []);

    useEffect(() => {
        if (id && id !== 'new') {
            findTournament({
                headers: {
                    Authorization: token
                }
            })
        }
    }, []);

    useEffect(() => {
        if (findTournamentResponse?.data) {
            const tournamentData = findTournamentResponse.data;
            const formattedTournamentData = {
                description: {
                    value: tournamentData.description,
                    errorMessage: ''
                },
                name: {
                    value: tournamentData.name,
                    errorMessage: ''
                },
                endDate: {
                    value: tournamentData.endDate,
                    errorMessage: ''
                },
                firstPlacePoints: {
                    value: tournamentData.firstPlacePoints,
                    errorMessage: ''
                },
                difficulty: {
                    value: tournamentData.difficulty,
                    errorMessage: ''
                },
                secondPlacePoints: {
                    value: tournamentData.secondPlacePoints,
                    errorMessage: ''
                },
                startDate: {
                    value: tournamentData.startDate,
                    errorMessage: ''
                },
                thirdPlacePoints: {
                    value: tournamentData.thirdPlacePoints,
                    errorMessage: ''
                },
            };
            setTournament(formattedTournamentData);
        }
    }, [findTournamentResponse]);

    useEffect(() => {
        if (findTasksResponse?.data) {
            const tasksData = findTasksResponse.data;
            const formattedTasksData = tasksData.map(task => ({
                title: {
                    text: task.title,
                    value: task.id
                },
            }));
            setTasks(formattedTasksData);
        }
    }, [findTasksResponse]);

    const checkForErrors = () => {
        let hasErrors = false;
        const validationErrors = [];

        if (tournament.name?.value === '') {
            validationErrors.push({
                propertyName: 'name',
                errorMessage: 'Required'
            });
        }

        if (tournament.description?.value === '') {
            validationErrors.push({
                propertyName: 'description',
                errorMessage: 'Required'
            });
        }
        if (tournament.endDate?.value === '') {
            validationErrors.push({
                propertyName: 'endDate',
                errorMessage: 'Required'
            });
        }

        if (tournament.firstPlacePoints?.value === '') {
            validationErrors.push({
                propertyName: 'firstPlacePoints',
                errorMessage: 'Required'
            });
        } else if (tournament.firstPlacePoints?.value < 5 || tournament.firstPlacePoints?.value > 100) {
            validationErrors.push({
                propertyName: 'firstPlacePoints',
                errorMessage: 'Please enter a valid value in range [5; 100]'
            });
        }

        if (tournament.secondPlacePoints?.value === '') {
            validationErrors.push({
                propertyName: 'secondPlacePoints',
                errorMessage: 'Required'
            });
        } else if (tournament.secondPlacePoints?.value < 5 || tournament.secondPlacePoints?.value > 100) {
            validationErrors.push({
                propertyName: 'secondPlacePoints',
                errorMessage: 'Please enter a valid value in range [5; 100]'
            });
        }

        if (tournament.thirdPlacePoints?.value === '') {
            validationErrors.push({
                propertyName: 'thirdPlacePoints',
                errorMessage: 'Required'
            });
        } else if (tournament.thirdPlacePoints?.value < 5 || tournament.thirdPlacePoints?.value > 100) {
            validationErrors.push({
                propertyName: 'thirdPlacePoints',
                errorMessage: 'Please enter a valid value in range [5; 100]'
            });
        }

        tasks.forEach((task, index) => {
            if (task.title.value === '') {
                validationErrors.push({
                    propertyName: `title[${index}]`,
                    errorMessage: 'Required'
                });
            }
        });

        tournament.tasks?.forEach((argument, index) => {
            if (argument.name.value === '') {
                validationErrors.push({
                    propertyName: `title[${index}].name`,
                    errorMessage: 'Required'
                });
            }
        });

        if (tournament.difficulty?.value === '') {
            validationErrors.push({
                propertyName: 'difficulty',
                errorMessage: 'Required'
            });
        }

        if (tournament.startDate?.value === '') {
            validationErrors.push({
                propertyName: 'startDate',
                errorMessage: 'Required'
            });
        }

        if (validationErrors.length > 0) {
            hasErrors = true;
            mapErrors(validationErrors);
        }
        return hasErrors;
    };

    const addTournamentTask = () => {
        const newTask = {
            title: {
                value: '',
                errorMessage: ''
            },
        };
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
    };

    useEffect(() => {
        if (response?.status === 200) {
            props.setSnackbar({
                color: theme.colors.DarkGreen,
                message: 'Edit successful!'
            });
            props.snackbarRef.current.show();

            navigate(`/tournaments/${id}`);
        }

    }, [response]);

    useEffect(() => {
        if (error) {
            if (error.response?.status === 403) {
                props.setSnackbar({
                    color: theme.colors.Red,
                    message: 'Only the creator of the tournament or admin can edit it'
                });
                props.snackbarRef.current.show();
            }
        }
    }, [error]);

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);

        setTasks(newTasks);
    };
    const mapErrors = (validationErrors) => {
        let updatedTournament = { ...tournament };
        let updatedTasks = [...tasks];
        validationErrors.forEach((error) => {
            if (error.propertyName.startsWith('title')) {
                const indexes = error.propertyName.match(/(?<=\[)[^\][]*(?=])/g);
                const index = parseInt(indexes[0], 10);

                updatedTasks = updatedTasks.map((task, i) => {
                    if (i === index) {
                        return {
                            ...task,
                            title: {
                                ...task.title,
                                errorMessage: error.errorMessage,
                            },
                        };
                    }
                    return task;
                });
            } else {
                updatedTournament = {
                    ...updatedTournament,
                    [error.propertyName]: {
                        ...updatedTournament[error.propertyName],
                        errorMessage: error.errorMessage,
                    },
                };
            }
        });
        setTournament(updatedTournament);
        setTasks(updatedTasks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = checkForErrors();
        if (!hasErrors) {
            const taskIds = tasks.map(task => task.title.value);
            const request = {
                name: tournament.name.value,
                description: tournament.description.value,
                endDate: tournament.endDate.value,
                firstPlacePoints: tournament.firstPlacePoints.value,
                secondPlacePoints: tournament.secondPlacePoints.value,
                thirdPlacePoints: tournament.thirdPlacePoints.value,
                difficulty: tournament.difficulty.value,
                startDate: tournament.startDate.value,
            };
            console.log(request);
            const config = {
                headers: {
                    Authorization: token
                },
                params: {
                    tasks: taskIds.join(', '),
                }
            };
            if (id && id !== 'new') {
                update(request, config);
            } else {
                save(request, config);
            }
        }
    };

    return (
        <Container topBar={topBar}>
            <Form title='Edit Tournament' onSubmit={handleSubmit} loading={loading || saveLoading}>
                <StackLayout>
                    <FormGroup>
                        <TextInput
                            label='Name'
                            name='name'
                            size='md'
                            value={tournament.name?.value}
                            onChange={handleChange}
                            required
                            errorMessage={tournament.name?.errorMessage}
                        />
                        <Select
                            title='Difficulty'
                            label='Difficulty'
                            name='difficulty'
                            size='md'
                            defaultOptionText='Select a difficulty'
                            value={tournament.difficulty?.value}
                            onChange={handleChange}
                            errorMessage={tournament.difficulty?.errorMessage}
                            options={difficulty}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <NumberInput
                            label='First Place Points'
                            name='firstPlacePoints'
                            size='xs'
                            value={tournament.firstPlacePoints?.value}
                            onChange={handleChange}
                            required
                            errorMessage={tournament.firstPlacePoints?.errorMessage}
                        />
                        <NumberInput
                            label='Second Place Points'
                            name='secondPlacePoints'
                            size='xs'
                            value={tournament.secondPlacePoints?.value}
                            onChange={handleChange}
                            required
                            errorMessage={tournament.secondPlacePoints?.errorMessage}
                        />
                        <NumberInput
                            label='Third Place Points'
                            name='thirdPlacePoints'
                            size='xs'
                            value={tournament.thirdPlacePoints?.value}
                            onChange={handleChange}
                            required
                            errorMessage={tournament.thirdPlacePoints?.errorMessage}
                        />
                    </FormGroup>
                    <FormGroup justifyContent='start'>
                        <Repeater
                            label='Tasks'
                            addButtonText='Add Task'
                            onAdd={addTournamentTask}
                            onRemove={removeTask}
                            firstItemRequired={true}
                        >
                            {tasks?.map((task, index) => (
                                <RepeaterItemContainer key={index}>
                                    <Select
                                        title='Task'
                                        label='Task'
                                        size='lg'
                                        name={`title[${index}]`}
                                        defaultOptionText='Select a task'
                                        value={task.title.value}
                                        onChange={handleChange}
                                        errorMessage={task.title.errorMessage}
                                        options={taskTitles}
                                        required
                                    />

                                </RepeaterItemContainer>
                            ))}
                        </Repeater>
                    </FormGroup>
                    <FormGroup>
                        <TextAreaInput
                            label='Description'
                            name='description'
                            height='64px'
                            size='xl'
                            value={tournament.description?.value}
                            onChange={handleChange}
                            required
                            errorMessage={tournament.description?.errorMessage}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextInput
                            label='Start Date'
                            name='startDate'
                            size='md'
                            value={tournament.startDate?.value}
                            onChange={handleChange}
                            required
                            errorMessage={tournament.startDate?.errorMessage}
                        />
                        <TextInput
                            label='End Date'
                            name='endDate'
                            size='md'
                            value={tournament.endDate?.value}
                            onChange={handleChange}
                            required
                            errorMessage={tournament.endDate?.errorMessage}
                        />
                    </FormGroup>
                </StackLayout>
            </Form>
        </Container>
    );
};

export default TournamentForm;