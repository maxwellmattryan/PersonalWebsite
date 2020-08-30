import { BlogPost } from '../models/post.model';
import { Profile } from '../models/profile.model';
import { Project } from '../models/project.model';

export interface Homepage {
    posts: BlogPost[];
    profile: Profile;
    projects: Project[];
}
