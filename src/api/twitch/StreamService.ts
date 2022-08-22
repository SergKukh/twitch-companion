import axios from "axios";
import { IStream } from "../../models/IStream";
import { getAccessToken, getClientId } from "../../utils/headers";

interface getTopStreamsResponse {
    streams: IStream[]
    pagination: string
}

export default class StreamService {
    static async getLiveStreams(): Promise<IStream[]> {
        try {
            const response = await axios.get('https://api.twitch.tv/helix/streams/followed', {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Client-Id': getClientId()
                },
                params: {
                    'user_id': localStorage.getItem('id')
                }
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async getTopStreams(pagination: string): Promise<getTopStreamsResponse> {
        try {
            const response = await axios.get('https://api.twitch.tv/helix/streams', {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Client-Id': getClientId()
                },
                params: {
                    after: pagination
                }
            });
            return { streams: response.data.data, pagination: response.data?.pagination?.cursor || '' };
        } catch (error) {
            console.log(error);
            return { streams: [], pagination: '' };
        }
    }
}