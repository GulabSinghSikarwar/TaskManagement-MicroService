import { applicationUrls } from '../utils/applicationUrls'
import { getRequestParams } from '../utils/utils';



export const getAllHostedZones = async () => {
    const url = applicationUrls.hostedZones
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getAllHostedZoneRecord = async (id) => {
    const url = applicationUrls.hostedZoneRecords(id)
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const createHostedZoneRecord = async (id, reqBody, method) => {
    const url = applicationUrls.hostedZoneRecords(id)
    const reqParams = getRequestParams(reqBody, method);
    const response = await fetch(url, reqParams)
    return response;
}
export const createHostedZone = async (reqBody) => {
    const url = applicationUrls.hostedZones
    const reqParams= await getRequestParams(reqBody,'POST')
    const response=await fetch(url,reqParams)
    return response;
}

export const deleteHostedZone = async (reqBody) => {

    const url = applicationUrls.hostedZones
    const reqParams = getRequestParams(reqBody, "DELETE")
    const response = await fetch(url, reqParams);
    return response;
}
 