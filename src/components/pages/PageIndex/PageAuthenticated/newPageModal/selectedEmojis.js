import emojiJSON from 'emoji.json/emoji-compact.json'

const chosenEmojis = [3844, 3845, 3838, 3846, 67, 66, 28, 15, 3, 4, 3910, 3802, 3715, 3609, 3602, 3620, 3625, 3636, 3626, 3645, 3646, 3678, 3689, 3201, 3207, ]

export const selectEmojis = () => {
    let emojiList = []
    chosenEmojis.map(index => {
        emojiList.push(emojiJSON[index])
    })
    return emojiList
}