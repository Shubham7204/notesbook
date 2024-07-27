import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNotes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [isLoading, setIsLoading] = useState(true);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State to hold search query
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                await getNotes();
            } catch (error) {
                console.error("Failed to fetch notes:", error);
                // Handle error (e.g., show an error message to the user)
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, [getNotes]);

    useEffect(() => {
        // Filter notes based on search query
        if (searchQuery.trim() === '') {
            setFilteredNotes(notes);
        } else {
            setFilteredNotes(
                notes.filter(note =>
                    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    note.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, notes]);

    const updateNote = (currentNote) => {
        setIsDialogOpen(true);
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setIsDialogOpen(false);
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote />
            <div className="mb-4 mt-8">
                <Input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2"
                />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <DialogTitle>Edit Note</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="etitle">Title</Label>
                            <Input type="text" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                        </div>
                        <div>
                            <Label htmlFor="edescription">Description</Label>
                            <Input type="text" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                        </div>
                        <div>
                            <Label htmlFor="etag">Tag</Label>
                            <Input type="text" id="etag" name="etag" value={note.etag} onChange={onChange} />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                        <Button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick}>Update Note</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="space-y-4 mt-4">
                {isLoading ? (
                    <p>Loading notes...</p>
                ) : Array.isArray(filteredNotes) && filteredNotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredNotes.map((note) => (
                            <Noteitem key={note._id} updateNote={updateNote} note={note} />
                        ))}
                    </div>
                ) : (
                    <p>No notes to display</p>
                )}
            </div>
        </>
    );
};

export default Notes;