import { APICore } from "@/helpers/api/apiCore.ts";

const api = new APICore();

function getComments(payload: { type: string, reference_id: string | undefined }) {
  return api.get('/comments', payload);
}

function createComment(params: { payload: any }) {
  return api.create('/comments', params);
}

function updateComment(id: number, params: { payload: any }) {
  return api.update(`/comments/${id}`, params);
}

function deleteComment(id: number) {
  return api.delete(`/comments/${id}`);
}

export { getComments, createComment, updateComment, deleteComment };