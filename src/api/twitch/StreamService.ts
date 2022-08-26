import axios from "axios";
import { IStream } from "../../models/IStream";
import { getAccessToken, getClientId } from "../../utils/headers";

interface getLiveStreamsResponse {
    streams: IStream[]
    pagination: string
}

interface getTopStreamsResponse {
    streams: IStream[]
    pagination: string
}

export default class StreamService {
    static async getLiveStreams(userId: string, pagination: string): Promise<getLiveStreamsResponse> {
        try {
            const response = await axios.get('https://api.twitch.tv/helix/streams/followed', {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Client-Id': getClientId()
                },
                params: {
                    'user_id': userId,
                    'after': pagination
                }
            });
            return { streams: response.data.data, pagination: response.data?.pagination?.cursor || '' };
        } catch (error) {
            return { streams: [] as IStream[], pagination: '' };
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
            return { streams: [], pagination: '' };
        }
    }
}