import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const usePhone = ()=>{
    const client = useQueryClient();

    const getPhone = ()=> useQuery<any, any>({
        queryKey: ["phoneKey"], // deps
        queryFn: () => api.get("Phone").then((res) => res.data),
      });

    const createPhone = useMutation<any, any, any>({
        mutationFn: (body: any) =>
          api.post("Phone", body).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["phoneKey"]})
        },

      });
      const deletePhone = useMutation<any, any, any>({
        mutationFn: (id: any) =>
          api.delete(`Phone/${id}`, id).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["phoneKey"]})
        },
      });

      const uptadePhone = useMutation<any, any, any>({
        mutationFn: ({id, body}) =>
          api.put(`Phone/${id}`, body).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["phoneKey"]})
        },
      });

    return {getPhone, createPhone, deletePhone, uptadePhone}
}