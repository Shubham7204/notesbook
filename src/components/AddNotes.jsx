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
        <Card className=" max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-primary text-white">
                <CardTitle className="text-3xl font-bold">Add a Note</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleClick} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-lg font-semibold">Title</Label>
                        <Input 
                            id="title" 
                            name="title"
                            value={note.title}
                            onChange={onChange}
                            minLength={5}
                            required
                            placeholder="Enter note title"
                            className="w-full p-3 text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
                        <Textarea 
                            id="description" 
                            name="description"
                            value={note.description}
                            onChange={onChange}
                            minLength={5}
                            required
                            placeholder="Enter note description"
                            rows={6}
                            className="w-full p-3 text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tag" className="text-lg font-semibold">Tag</Label>
                        <Input 
                            id="tag" 
                            name="tag"
                            value={note.tag}
                            onChange={onChange}
                            placeholder="Enter note tag (optional)"
                            className="w-full p-3 text-lg"
                        />
                    </div>
                    <Button 
                        className="w-full text-lg py-3"
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