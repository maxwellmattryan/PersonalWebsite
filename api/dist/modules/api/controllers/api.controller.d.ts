import { BlogPost } from "@api/modules/blog/entities/blog-post.entity";
import { PortfolioProfile } from "@api/modules/portfolio/entities/portfolio-profile.entity";
import { BlogPostService } from '@api/modules/blog/services/blog-post.service';
import { PortfolioProfileService } from '@api/modules/portfolio/services/portfolio-profile.service';
import { PortfolioProjectService } from '@api/modules/portfolio/services/portfolio-project.service';
export declare class ApiController {
    private readonly blogService;
    private readonly profileService;
    private readonly projectService;
    constructor(blogService: BlogPostService, profileService: PortfolioProfileService, projectService: PortfolioProjectService);
    getHomepage(): Promise<{
        profile: PortfolioProfile;
        posts: BlogPost[];
    }>;
}
