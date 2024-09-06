import { url } from "./constant";

class ApplicationUrls {
    authUrl = url + '/auth'

    get loginUrl() {
        return this.authUrl + '/login'
    }

    get signupUrl() {
        return this.authUrl + '/register'
    }

    get validateToken() {
        return this.authUrl + '/validateToken'
    }

    get verifyTotp() {
        return this.authUrl + '/verify-totp'
    }

    get createTask() {
        return url + '/api/tasks'
    }

    fetchComments(taskId) {
        return url + `/api/tasks/${taskId}/comments/`
    }

    allTaskStatus(userId) {
        return url + '/api/tasks/' + userId
    }
    updateTaskStatus(taskId) {
        return url + '/api/tasks/' + taskId + '/status'
    }
    updateTask(taskId) {
        return url + '/api/tasks/' + taskId
    }


}
export const applicationUrls = new ApplicationUrls();