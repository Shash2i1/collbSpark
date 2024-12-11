const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteProjectsCollectionId : String(import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID),
    
    appwriteImagesBucketId : String(import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID),
    appwriteProjectsReportsBucketId : String(import.meta.env.VITE_APPWRITE_PROJECTS_REPORTS_BUCKET_ID),
    appwriteSavedProjectID : String(import.meta.env.VITE_APPWRITE_SAVED_PROJECTS_ID)
}

export default conf