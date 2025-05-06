export const sanitizeObject = <T>(payload: Record<string, any>): Partial<T> => {
  const draftPayload = { ...payload };
  const keys = Object.keys(payload);

  keys.forEach(key => {
    if (draftPayload[key] == null || typeof draftPayload[key] === 'undefined') {
      delete draftPayload[key];
    }
  });

  return draftPayload as Partial<T>;
};
