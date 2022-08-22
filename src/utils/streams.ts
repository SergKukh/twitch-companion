
const fetchFavoritesStreams = () => {
    return JSON.parse(localStorage.getItem('favStreams') || '{}');
}

export const getFavoritesStreams = (userId: string): string[] => {
    const data = fetchFavoritesStreams();
    return data[userId] || [];
}

export const setFavoriteStream = (userId: string, streamerId: string, isFavorite: boolean): void => {
    const data = fetchFavoritesStreams();
    let favStreams: string[] = data[userId] || [];
    const index = favStreams.findIndex(val => val === streamerId);
    if (index > -1 && !isFavorite) {
        favStreams = favStreams.filter(val => val !== streamerId);
    } else if (index === -1 && isFavorite) {
        favStreams.push(streamerId);
    }
    localStorage.setItem('favStreams', JSON.stringify({ ...data, [userId]: favStreams }))
}

export const openLinkStream = (username: string): void => {
    window.open(`https://twitch.tv/${username}`, '_blank')
}