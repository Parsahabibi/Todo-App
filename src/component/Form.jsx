import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../Context/TodoContext'
import AddIcon from '@mui/icons-material/Add';

import Checkbox from '@mui/material/Checkbox';

import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Form = () => {

    const emptyForm = { id: Math.floor(Math.random() * 1000), title: "" }
    const [form, setForm] = useState(emptyForm)

    useEffect(() => {
        const todoStore = JSON.parse(localStorage.getItem('todoStore'))
        if (todoStore) { setForm(todoStore) }
    }, [])

    useEffect(() => {
        localStorage.setItem('todoStore', JSON.stringify(form))
    }, [form])

    const [edit, setEdit] = useState(false)

    const { state, dispatch } = useContext(TodoContext)

    const [text, setText] = useState(form);


    const handleDelete = (id) => {
        dispatch({ type: "DeleteTodo", payload: { id: id } })
    }

    const handleUpdate = (id, newValue) => {
        setEdit(true)
        dispatch({ type: "UpdateTodo", payload: { id: id, title: newValue } })
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChange = (e) => {
        setForm({ ...form, title: e.target.value })
    }

    const handleChangeEdit = (e) => {
        setText({ ...text, title: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.title !== '') {
            dispatch({ type: "AddTodo", payload: form })
            setText(form)
            setForm(emptyForm)
        } else {
            alert("Your ToDo Is Empty")
        }
    }


    return (
        <Grid borderRadius={2.5} bgcolor={'#434242'} boxShadow={10} width={'50%'} margin='auto' container justifyContent={'center'} alignItems={"center"} gap={5} mt={5}>
            {
                edit === true ?
                    <Grid >
                        <Grid pt={5} pb={5}>
                            <Typography color={"#22A39F"} variant='h3'>REACT TODO APP(UPDATE)</Typography>
                        </Grid>
                        <Grid pb={5} container justifyContent={'center'} alignItems={'center'}>
                            <TextField label='Update ToDo' style={{ width: "100%" }} sx={{
                                "& .MuiInputBase-root": {
                                    color: 'white'
                                },
                                "& .MuiFormLabel-root": {
                                    color: '#22A39F'
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: 'primary.main'
                                }
                            }
                            } value={text.title} onChange={handleChangeEdit} />
                        </Grid>
                        <Grid pb={5} container justifyContent={'space-between'} alignItems={'center'}>
                            <Button variant='outlined' color='success' onClick={() => { handleUpdate(text.id, text.title); setEdit(false); }}><Typography style={{ display: 'flex', alignItems: "center" }} color="#38E54D">Save<DoneIcon /></Typography></Button>
                            <Button endIcon={<CancelIcon />} variant='outlined' color='error' onClick={() => setEdit(false)}><Typography color="red">Cancel</Typography></Button>
                        </Grid>
                    </Grid>
                    :

                    <>
                        <Grid pt={5}>
                            <Typography color={"#22A39F"} variant='h3'>REACT TODO APP</Typography>
                        </Grid>
                        <form onSubmit={handleSubmit} style={{ width: '100%', display: "flex", justifyContent: "center", padding: "25px 0px" }}>
                            <TextField sx={{
                                "& .MuiInputBase-root": {
                                    color: 'white'
                                },
                                "& .MuiFormLabel-root": {
                                    color: '#22A39F'
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: 'primary.main'
                                }
                            }
                            } style={{ width: "70%" }} placeholder='Please Enter Your ToDo' value={form.title} onChange={handleChange} id="outlined-basic" label="AddTodo" variant="outlined" />
                            <Button sx={{ borderColor: '#181D31' }} onClick={handleSubmit} variant='outlined' color='primary'>
                                <Typography color={"#22A39F"}>add</Typography>
                                <AddIcon sx={{ color: "#22A39F" }} />
                            </Button>
                        </form>
                        {state.map(
                            item =>
                                <Grid borderLeft={10} borderColor={"#fdd71a"} bgcolor={"#2e302d"} key={item.id} p={2} container alignItems={"center"} justifyContent={'center'} gap={5}>
                                    <Grid>
                                        <Checkbox
                                            {...label}
                                            icon={<BookmarkBorderIcon />}
                                            checkedIcon={<BookmarkIcon />}
                                        />
                                        <Checkbox color='success' {...label} />
                                    </Grid>
                                    <Grid>
                                        <Typography variant='h6' color={'white'}>{item.title}</Typography>
                                    </Grid>
                                    <Button position={"fixed"} variant='outlined' color='error' onClick={() => handleDelete(item.id)}>delete<DeleteIcon /></Button>
                                    <Button position={"fixed"} onClick={() => handleUpdate(item.id, item.title)} variant='outlined'>update<EditIcon /></Button>
                                </Grid>
                        )}
                    </>
            }
        </Grid>
    )
}

export default Form