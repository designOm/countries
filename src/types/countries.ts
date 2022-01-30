export interface Continent {
    name:string,
    code:string
}
export interface Country {
    name:string,
    code:string
    capital:string,
    emoji:string,
    emojiU:string
    continent:Continent
  }