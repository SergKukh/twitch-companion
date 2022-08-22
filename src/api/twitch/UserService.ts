import axios from "axios"
import { IUser } from "../../models/IUser";
import { getAccessToken, getClientId } from "../../utils/headers";

interface getUsersResponse {
    display_name: string
    id: string
    profile_image_url: string
}

interface getUsersFollowsResponse {
    data: {
        to_id: string
        to_name: string
        followed_at: string
    }[]
    total: number
    pagination: {
        cursor?: string
    }
}

interface fetchUserFollowListResponse {
    data: {
        id: string
        username: string
        followed_at: string
    }[]
    total: number
    pagination: {
        cursor?: string
    }
}

interface getUserFollowListResponse {
    users: IUser[]
    pagination: string | undefined
    total: number
}

export default class UserService {
    static async fetchUsers(id: string[]): Promise<IUser[]> {
        try {
            const response = await axios.get('https://api.twitch.tv/helix/users', {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Client-Id': getClientId()
                },
                params: {
                    id
                }
            });
            const data: getUsersResponse[] = response.data.data;
            const users: IUser[] = data.map(value => ({
                username: value.display_name,
                userId: value.id,
                profileImage: value.profile_image_url
            }));
            return users;
        } catch (error) {
            return [];
        }
    }

    static async fetchUserFollowList(user_id: string, pagination: string | undefined = undefined): Promise<fetchUserFollowListResponse> {
        try {
            const response = await axios.get('https://api.twitch.tv/helix/users/follows', {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Client-Id': getClientId()
                },
                params: {
                    from_id: user_id,
                    after: pagination
                }
            });
            const data: getUsersFollowsResponse = response.data;
            return {
                data: data.data.map(val => ({ id: val.to_id, username: val.to_name, followed_at: val.followed_at })),
                total: data.total,
                pagination: data.pagination
            }
        } catch (error) {
            return {} as fetchUserFollowListResponse;
        }
    }

    static async getUser(): Promise<IUser> {
        const users = await this.fetchUsers([]);
        if (users.length) return users[0];
        else return {} as IUser;
    }

    static async getUsers(id: string[]): Promise<IUser[]> {
        let users: IUser[] = [];
        while (id.length) {
            const chunk = id.slice(0, 100);
            id = id.slice(100);
            const response = await this.fetchUsers(chunk);
            users = users.concat(response);
        }
        return users;
    }

    static async getUserFollowList(user_id: string, pagination: string | undefined = undefined): Promise<getUserFollowListResponse> {
        const response = await this.fetchUserFollowList(user_id, pagination);
        const users = await this.getUsers(response.data.map(v => v.id));
        return { users, pagination: response.pagination?.cursor, total: response.total };
    }
}