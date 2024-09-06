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
        return url + '/task'
    }

    fetchComments(taskId) {
        return url + `/task/${taskId}/comments/`
    }

    allTaskStatus(userId) {
        return url + '/task/' + userId
    }
    updateTaskStatus(taskId) {
        return url + '/task/' + taskId + '/status'
    }
    updateTask(taskId) {
        return url + '/task/' + taskId
    }


}
export const applicationUrls = new ApplicationUrls();