import {useEffect, useReducer} from 'react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import Loading from "@/components/Loading.tsx";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
interface stateInterface{user:[],loading:boolean,delete:User | null}
export default function UsersTable() {
    const [state, dispatch] = useReducer((prevState:stateInterface, args:{type:string,payload:boolean | any})=>{
        return args.type==="user"?
            {...prevState,user:args.payload}:
            args.type==="loading"?
                {...prevState,loading: args.payload}:
                args.type==="delete"?
                    {...prevState, delete: args.payload }:
                args.type==="deleteConfirm"?
                    {...prevState,user:prevState.user.filter(u=>u.id!==prevState.delete?.id),delete:null}:
                    prevState
    },{user:[],loading:true,delete:null})

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then(data => dispatch({ type: 'user', payload: data.users }))
            .finally(()=>dispatch({ type: 'loading', payload: false }))
            .catch(e=>{
                console.log(e);dispatch({ type: 'loading', payload: true })});
    }, []);

    const handleDelete = () => {
        if (state.delete) {
            dispatch({ type: 'deleteConfirm' ,payload:null})
        }
    };

    return (
        <div className="p-6 dark bg-background text-foreground">
            {!state.loading?<div className="p-6">
                <h1 className="text-xl font-bold mb-4 text-center">List</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Operation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {state.user.map((user:User) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" onClick={() => dispatch({ type: 'delete', payload: user })}>
                                                delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Delete "{user.firstName} {user.lastName}"؟
                                                </AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel onClick={() => dispatch({ type: 'delete', payload: null })}>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete}>
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>:<Loading />}
        </div>
    );
}
