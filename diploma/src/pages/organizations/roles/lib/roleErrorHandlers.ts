import axios from "axios";

export const getRoleErrorStatus = (error: unknown) =>
  axios.isAxiosError(error) ? error.response?.status : undefined;

export const getRoleSaveErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Unable to save this role.";

  const responseData = error.response?.data;

  if (
    typeof responseData === "object" &&
    responseData !== null &&
    "error" in responseData &&
    typeof responseData.error === "string"
  ) {
    return responseData.error;
  }

  if (typeof responseData === "string" && responseData.trim()) {
    return responseData;
  }

  return error.response?.status
    ? `The server rejected the role (${error.response.status}).`
    : "Unable to save this role.";
};
