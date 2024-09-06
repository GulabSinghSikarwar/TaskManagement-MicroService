import { applicationUrls } from '../component/utils/applicationUrls'
import { getRequestParams } from '../component/utils/utils'

export const login = async (reqBody) => {
    const url = applicationUrls.loginUrl
    const reqParams = getRequestParams(reqBody, 'POST');
    const response = await fetch(url, reqParams)
    return response;
}

export const signup = async (reqBody) => {
    const url = applicationUrls.signupUrl
    const reqParams = getRequestParams(reqBody, 'POST');
    const response = await fetch(url, reqParams)
    return response;
}

export const validateToken = async (reqBody) => {
    const url = applicationUrls.validateToken;
    console.log(" req body : ", reqBody);
    const response = await fetch(url, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    return response;
}

export const verifyToken = async (reqBody) => {
    const url = applicationUrls.verifyTotp;
    const reqParams = getRequestParams(reqBody, 'POST');
    const response = await fetch(url, reqParams);
    return response;
}
