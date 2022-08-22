export const getAccessToken = (): string => {
    return localStorage.getItem('access_token') || '';
}

export const setAccessToken = (token: string): void => {
    localStorage.setItem('access_token', token);
}

export const removeAccesToken = (): void => {
    localStorage.removeItem('access_token');
}

export const getClientId = (): string => {
    return process.env.REACT_APP_CLIENT_ID || '';
}