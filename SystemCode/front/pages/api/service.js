import { getAxios, postAxios } from '../../utils/connect'
const url = '/getGood'
const recUrl = '/recommend'

export const getGood = (params) => {
    return getAxios({url, params})
}

export const recommend = (params) => {
    return postAxios({url: recUrl, params})
}