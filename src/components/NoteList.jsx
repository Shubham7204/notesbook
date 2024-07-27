import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { TrashIcon, EditIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const NotesList = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, deleteNote, editNote } = context;
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingNote, setEditingNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                await getNotes();
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, [getNotes]);

    useEffect(() => {
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

    const handleUpdateNote = (note) => {
        setEditingNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
        setIsDialogOpen(true);
    };

    const handleEditNote = () => {
        editNote(editingNote.id, editingNote.etitle, editingNote.edescription, editingNote.etag);
        setIsDialogOpen(false);
    };

    const onChange = (e) => {
        setEditingNote({ ...editingNote, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="mb-4 mt-8">
                <Input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2"
                />
            </div>
            <div className="space-y-4 mt-4">
                {isLoading ? (
                    <p>Loading notes...</p>
                ) : Array.isArray(filteredNotes) && filteredNotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredNotes.map((note) => (
                            <Card key={note._id} className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="flex-grow">
                                    <CardTitle className="text-2xl mb-2">{note.title}</CardTitle>
                                    <CardDescription className="text-base">{note.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{note.tag}</span>
                                        <div className="flex space-x-2">
                                            <Button variant="destructive" onClick={() => deleteNote(note._id)} className="p-2">
                                                <TrashIcon className="h-5 w-5" />
                                            </Button>
                                            <Button variant="outline" onClick={() => handleUpdateNote(note)} className="p-2">
                                                <EditIcon className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No notes to display</p>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <DialogTitle>Edit Note</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="etitle">Title</Label>
                            <Input type="text" id="etitle" name="etitle" value={editingNote.etitle} onChange={onChange} minLength={5} required />
                        </div>
                        <div>
                            <Label htmlFor="edescription">Description</Label>
                            <Input type="text" id="edescription" name="edescription" value={editingNote.edescription} onChange={onChange} minLength={5} required />
                        </div>
                        <div>
                            <Label htmlFor="etag">Tag</Label>
                            <Input type="text" id="etag" name="etag" value={editingNote.etag} onChange={onChange} />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                        <Button disabled={editingNote.etitle.length < 5 || editingNote.edescription.length < 5} onClick={handleEditNote}>Update Note</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NotesList;