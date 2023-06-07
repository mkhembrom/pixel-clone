import { createSlice } from '@reduxjs/toolkit'
import { fetchImage, fetchSearchImage, fetchSearchVideo, fetchVideo } from './imageApi'

const initialState = {
    imageList: [],
    videoList: [],
    bookmarkList: [],
    isLoading: false,
    isError: null,
    searchText: "",
    isVideo: false,
    isPhoto: true,
    page: 1,
}

const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        saveBookmark: (state, action) => {
            return {
                ...state,
                bookmarkList: [...state.bookmarkList, action.payload]
            }
        },
        searchFun: (state, action) => {
            return {
                ...state,
                searchText: action.payload
            }
        },
        setVideo: (state) => {
            return {
                ...state,
                isVideo: true,
                isPhoto: false
            }
        },
        setPhoto: (state) => {
            return {
                ...state,
                isVideo: false,
                isPhoto: true
            }
        },
        setPageNumber: (state, action) => {

            if (action.payload === 1) {
                return {
                    ...state,
                    page: 1
                }
            } else {
                return {
                    ...state,
                    page: state.page + 1
                }
            }

        },
        resetImageList: (state) => {
            return {
                ...state,
                imageList: [],
            }
        },
        resetVideoList: (state) => {
            return {
                ...state,
                videoList: [],
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImage.fulfilled, (state, action) => {
                return { ...state, imageList: [...state.imageList, ...action.payload.photos], isLoading: false }
            })
            .addCase(fetchImage.pending, (state, action) => {
                return { ...state, isLoading: true }
            })
            .addCase(fetchImage.rejected, (state, action) => {
                return { ...state, isError: action.payload, isLoading: false }
            })

            .addCase(fetchSearchImage.fulfilled, (state, action) => {
                return { ...state, imageList: [...state.imageList, ...action.payload.photos], isLoading: false }
            })
            .addCase(fetchSearchImage.pending, (state, action) => {
                return { ...state, isLoading: true }
            })
            .addCase(fetchSearchImage.rejected, (state, action) => {
                return { ...state, isError: action.payload, isLoading: false }
            })

            .addCase(fetchVideo.fulfilled, (state, action) => {
                return { ...state, videoList: [...state.videoList, ...action.payload.videos], isLoading: false }
            })
            .addCase(fetchVideo.pending, (state, action) => {
                return { ...state, isLoading: true }
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                return { ...state, isError: action.payload, isLoading: false }
            })

            .addCase(fetchSearchVideo.fulfilled, (state, action) => {
                return { ...state, videoList: [...state.videoList, ...action.payload.videos], isLoading: false }
            })
            .addCase(fetchSearchVideo.pending, (state, action) => {
                return { ...state, isLoading: true }
            })
            .addCase(fetchSearchVideo.rejected, (state, action) => {
                return { ...state, isError: action.payload, isLoading: false }
            })

    }
})

export const { searchFun, resetImageList, resetVideoList, setPageNumber, setVideo, setPhoto, saveBookmark } = imageSlice.actions
export default imageSlice.reducer