import {faBook} from '@fortawesome/free-solid-svg-icons';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export const filterData = [
    {
        id: 1,
        title: "Category",
        data: [
            "Fiction",
            "Fantasy",
            "Action",
            "Romance",
            "Horror",
            "Art",
            "History"
        ],
        icon: faBook
    },
    {
        id: 2,
        title: "Author",
        data: [
            "Author 1",
            "Author 2",
            "Author 3",
            "Author 4",
            "Author 5",
            "Author 6",
            "Author 7"
        ],
        icon: faUserPen
    },
    {
        id: 3,
        title: "Rating",
        data: [
            "Rating 1",
            "Rating 2",
            "Rating 3",
            "Rating 4",
            "Rating 5",
        ],
        icon: faStar
    }
]
