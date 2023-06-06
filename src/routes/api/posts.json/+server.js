import { json } from '@sveltejs/kit'
export const GET = async() => {
    const posts =[
      {
        "id": 1,
        "title": "¿Quieres Comprar o Arrendar Una Propiedad?",
        "image":"https://picsum.photos/id/10/800/500",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "id": 2,
        "title": "¿Vendes o Arriendas Alguna Propiedad?",
        "image": "https://picsum.photos/id/17/800/500",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        "id": 3,
        "title": "¿Quieres Invertir en Bienes Raíces?",
        "image": "https://picsum.photos/id/49/800/500",
        "body": "Invertir en Bienes Raices es la manera más redituable y segura de hacer crecer tu patrimonio"
      }
    ];

    return json(posts)
};