import conf from '../Configurations/Conf'
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class ProjectService {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async uploadProfilePic(userId, file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteImagesBucketId,
                userId,
                file
            );
        } catch (error) {
            console.error("ProjectService::uploadProfilePic", error);
            return false;
        }
    }

    async getpreviewConfirmation(fileId){
        try{
            const res = this.bucket.getFilePreview(
                conf.appwriteImagesBucketId,
                fileId
            )
            console.log('hel',res)
            return res;
            
        }
        catch(err){
            console.log(err)
        }
    }

    async getProfilePreview(fileId) {
        try {
            // Add a timestamp to the URL to prevent caching
            const previewUrl = this.bucket.getFilePreview(
                conf.appwriteImagesBucketId,
                fileId
            );
            const timestampedUrl = `${previewUrl}&timestamp=${new Date().getTime()}`;
            return timestampedUrl;
        } catch (error) {
            console.error("ProjectService::getProfilePreview", error);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteImagesBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("ProjectService::deleteFile", error);
            return false;
        }
    }

    /*Project Services */ 

    async uploadProject({userID, createdDate, authorName, title, field, description
        ,thumbnailID, reportID, githubLink, subscription
    }){
        try{
            return this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                ID.unique(),
                {
                    userID,
                    createdDate,
                    authorName,
                    title,
                    field,
                    description,
                    thumbnailID,
                    reportID,
                    githubLink,
                    subscription
                }
            )
        }
        catch(err){
            console.log("ProjectService::postProject",err);
        }
    }

    //Delete Project
    async deleteProject(projectId){
        try{
            this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                projectId
            )
            return true;
        }
        catch(error){
            console.log("projectServices::deleteProject",error)
            return false
        }
    }

    //Upload report
    async uploadReport(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteProjectsReportsBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("ProjectService::uploadProject",error)
            return false
        }
    }
    
    //Delete Report
    async deleteReport(fileId){
        try{    
            await this.bucket.deleteFile(
                conf.appwriteProjectsReportsBucketId,
                fileId
            )
            return true;
        }
        catch(error){
            console.log("ProjectService::deleteReport",error);
            return false
        }
    }
    //get report
    async getReport(reportID){
        try{
            return await this.bucket.getFileView(
                conf.appwriteProjectsReportsBucketId,
                reportID
            );
    
        }
        catch(error){
            console.log("ProjectService::getReport",error);
            return false
        }
    }

    //get individual project
    async getProject(projectID){
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                projectID
            )
        }
        catch(error){
            console.log("ProjectService::getProject",error)
        }
    }

    //Get my projects
    async getMyProjects(userID){
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                [Query.equal("userID", userID)]
            )
        }
        catch(error){
            console.log("ProjectService::getMyProjects",error)
            return false;
        }
    }

    //Get Recent Projects
    async getRecentProjects(){
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                [Query.orderDesc("$createdAt"),
                    Query.limit(5)
                ]
            )
        }
        catch(error){
            console.log("ProjectServices::getRecentProjects",err);
        }
    }

    async getFieldsProjects(field){
        try{
            const file= this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                [Query.equal("field",field)]
            )
            console.log(file)
            return file;
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    //Sort the projects
    async sortProjects(){

    }
}

const projectService = new ProjectService();
export default projectService;
