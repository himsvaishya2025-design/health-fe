import api from "./api";

export const getMembers = (page = 1, limit = 10) =>
  api.get(`/members?page=${page}&limit=${limit}`);

export const getMemberById = (memberId) =>
  api.get(`/members/${memberId}`);

export const createMember = (data) =>
  api.post("/members", data);

export const updateMember = (memberId, data) =>
  api.patch(`/members/${memberId}`, data);

export const deleteMember = (memberId) =>
  api.delete(`/members/${memberId}`);


export const getPackages=()=>{
 return  api.get("/packages")
}

export const getTrainers=()=>{
 return  api.get("/trainers")
}



export const getAttendance=()=>{
 return  api.get("/attendance")
}