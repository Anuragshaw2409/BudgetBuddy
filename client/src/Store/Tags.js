import {atom} from 'recoil'


const tagsAtom = atom({
    key: "TagsUser",
    default:[
        ["🏠", "Rent"],
        ["💊", "Medicine"],
        ["🍕", "Food"],
        ["👕", "Clothes"],
        ["🎁", "Gift"],
        ["📚", "Education"],
        ["⛱️", "Vacation"],
        ["🥦", "Groceries"]



    ]
})

export {tagsAtom};