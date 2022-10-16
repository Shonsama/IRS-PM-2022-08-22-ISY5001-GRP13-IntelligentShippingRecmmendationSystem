import { getAxios, postAxios } from '@/utils/axios'
const url = '/a/b'

export const getGood = (params) => {
    return postAxios({url, params})
}

export const recommend = (params) => {
    return postAxios({url, params})
}