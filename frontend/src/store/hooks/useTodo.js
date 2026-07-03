import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { todoAllGetApi, todoGetApi, todoDeleteApi, todoPostApi, todoPutApi, todoTogglePutApi } from "../apis/todo.api"


export const useAllGetTodo = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: todoAllGetApi
    })
}

export const useGetTodo = (id) => {
    return useQuery({
        queryKey: ["todos", id],
        queryFn: () => todoGetApi(id),
        enabled: !!id
    })
}

export const usePostRegisterTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoPostApi,
        onSuccess: (dataObj) => {
            ["todos"],
            (old=[]) => [
                ...old, dataObj
            ]
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}

export const usePutUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoPutApi,
        onSuccess: (dataObj) => {
        queryClient.setQueryData(
            ["todos"],
            (old = []) =>
                old.map(item =>
                    item.id === dataObj.id ? dataObj : item
                )
        );
}
    })
    queryClient.invalidateQueries({
        queryKey: ["todos"]
    })
}

export const usePutToggleTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoTogglePutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (old=[]) => old.map(item => (
                    item.id === dataObj ?
                    {...dataObj, checked: !data.checked}
                    : item
                ))
            )
            queryClient.invalidateQueries(
                ["todos", dataObj.id]
            )
        }
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoDeleteApi,
        onSuccess: (id) => {
            queryClient.setQueryData(
                ["todos"],
                (old=[]) => old.filter(item => (
                    item.id !== id
                ))
            )
            queryClient.removeQueries(
                ["todos", id]
            )
        }
    })
}