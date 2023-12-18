import { trackSelfDescribingEvent } from '@snowplow/browser-tracker'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

const usePlaySong = (music: IMusic) => {
  const navigate = useNavigate()
  const { userId, username } = useAuth()

  const onPlaySong = () => {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:com.chillzone/play_music/jsonschema/1-0-0',
        data: {
          user_id: userId,
          username,
          song_id: music.id,
          song_title: music.title,
          artist_name: music.artist.name,
          topics_list: music.topics.map(each => each.name)
        }
      }
    })

    navigate(
      `?${new URLSearchParams({
        play: music.id
      })}`
    )
  }

  return onPlaySong
}

export default usePlaySong
