import { json } from '@sveltejs/kit'
export const GET = async() => {
    const contacts =[
      {
        "name": 1,
        "lastname": "Marines",
      },
      {
        "name": "Claudia",
        "lastname": "Chavira",
      },
      {
        "name": "Perez",
        "lastname": "Pito",
      }
    ];

    return json(contacts)
};

