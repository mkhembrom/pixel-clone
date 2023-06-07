import { createAsyncThunk } from "@reduxjs/toolkit"
import { Axios } from "../../../utils/fetcher"

export const fetchImage = createAsyncThunk(
    'image/fetchByCurated',
    async ({ page, per_page }) => {

        const response = await Axios.get('/v1/curated', {
            params: {
                page,
                per_page
            }
        })
        return response.data
    }
);

export const fetchSearchImage = createAsyncThunk(
    'image/fetchByName',
    async ({ query, page, per_page }) => {

        const response = await Axios.get('/v1/search', {
            params: {
                query,
                page,
                per_page
            }
        })
        return response.data
    }
);


export const fetchVideo = createAsyncThunk(
    'video/fetchByCurated',
    async ({ query, page, per_page }) => {

        const response = await Axios.get('/videos/popular', {
            params: {
                query,
                page,
                per_page
            }
        })
        return response.data
    }
);

export const fetchSearchVideo = createAsyncThunk(
    'video/fetchByName',
    async ({ query, page, per_page }) => {

        const response = await Axios.get('/videos/search', {
            params: {
                query,
                page,
                per_page
            }
        })
        return response.data
    }
);