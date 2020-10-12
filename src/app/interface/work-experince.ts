export interface WorkExperince {
    id: number;
    startYear: string;
    endYear?: any;
    companyName: string;
    nickName: string;
    companyUrl: string;
    role: string;
    discription: string;
    projects: Array<Project>;
}

interface Project {
    projectUrl: string;
    clientName: string;
    discription: string;
    technologies: Array<string>;
    responsibilities: Array<string>;
}