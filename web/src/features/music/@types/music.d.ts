declare interface ITopic {
  id: string
  name: string
}

declare interface IArtist {
  id: string
  name: string
}

declare interface IMusic {
  id: string
  title: string
  thumbnail: string
  duration: number
  artist: IArtist
  topics: ITopic[]
}
