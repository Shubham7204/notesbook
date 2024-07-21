import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { TrashIcon, EditIcon } from 'lucide-react';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
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
                        <Button variant="outline" onClick={() => updateNote(note)} className="p-2">
                            <EditIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Noteitem;