import { Post } from '../models/post.model';
import { Profile } from '../models/profile.model';

export interface Homepage {
    posts: Array<Post>;
    profile: Profile;
}