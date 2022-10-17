import { getAxios, postAxios } from '../../utils/connect'
const url = '/getGood'

export const getGood = (params) => {
    return getAxios({url, params})
}

export const recommend = (params) => {
    return postAxios({url, params})
}