import apiSlice from '~/app/api/apiSlice'

const musicService = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMusic: builder.query<ApiResponsePaginated<IMusic[]>, { page: number; offset?: number }>({
      query: ({ page, offset }) => `/music?page=${page}&offset=${offset || 10}`,
      providesTags: (result, error, arg) => {
        if (result) {
          return [...result.data.map(({ id }) => ({ type: 'Music' as const, id })), { type: 'Music', id: 'LIST' }]
        }
        return [{ type: 'Music', id: 'LIST' }]
      }
    }),
    getMusicById: builder.query<IMusic, string>({
      query: id => `/music/${id}`,
      transformResponse: (response: ApiResponse<IMusic>) => response.data,
      providesTags: (result, error, arg) => [{ type: 'Music', id: arg }]
    })
  })
})

export const { useGetMusicQuery, useGetMusicByIdQuery } = musicService
