import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <Card className="shadow-md rounded-lg">
            <CardHeader className="bg-primary rounded-t-lg">
                <CardTitle className="text-2xl font-bold">Add a Note</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <form onSubmit={handleClick} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="title" className="text-md font-semibold">Title</Label>
                        <Input 
                            id="title" 
                            name="title"
                            value={note.title}
                            onChange={onChange}
                            minLength={5}
                            required
                            placeholder="Enter note title"
                            className="w-full p-2 text-md"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="description" className="text-md font-semibold">Description</Label>
                        <Textarea 
                            id="description" 
                            name="description"
                            value={note.description}
                            onChange={onChange}
                            minLength={5}
                            required
                            placeholder="Enter note description"
                            rows={4}
                            className="w-full p-2 text-md"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="tag" className="text-md font-semibold">Tag</Label>
                        <Input 
                            id="tag" 
                            name="tag"
                            value={note.tag}
                            onChange={onChange}
                            placeholder="Enter note tag (optional)"
                            className="w-full p-2 text-md"
                        />
                    </div>
                    <Button 
                        className="w-full text-md py-2"
                        type="submit" 
                        disabled={note.title.length < 5 || note.description.length < 5}
                    >
                        Add Note
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddNote
