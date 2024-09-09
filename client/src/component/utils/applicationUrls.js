// import { url } from "./constant";

class ApplicationUrls {
    url = ''
    authUrl = this.url + '/auth'

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
        return '/tasks'
    }

    fetchComments(taskId) {
        return `/tasks/${taskId}/comments/`
    }

    allTaskStatus(userId) {
        return '/tasks/' + userId + '/'
    }
    updateTaskStatus(taskId) {
        return '/tasks/' + taskId + '/status'
    }
    updateTask(taskId) {
        return '/tasks/' + taskId
    }


}
export const applicationUrls = new ApplicationUrls();