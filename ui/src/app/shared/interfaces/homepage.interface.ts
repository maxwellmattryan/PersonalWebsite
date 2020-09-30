import { BlogPost } from '@ui/modules/blog/models';
import { PortfolioProfile } from '@ui/modules/portfolio/models';

export interface Homepage {
    posts: BlogPost[];
    profile: PortfolioProfile;
}
