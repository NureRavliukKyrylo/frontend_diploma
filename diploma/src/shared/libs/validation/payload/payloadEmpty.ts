export const isPayloadEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true;

  if (Array.isArray(obj)) {
    return obj.length === 0 || obj.every(isPayloadEmpty);
  }

  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    if (keys.length === 0) return true;

    return Object.values(obj).every(isPayloadEmpty);
  }

  if (typeof obj === "string") return obj.trim() === "";

  return false;
};
