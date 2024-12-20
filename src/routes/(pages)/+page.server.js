export const load = async({fetch}) => {
    const getPosts = async() =>{
        const res = await fetch("./api/posts.json");
        const data = await res.json();
        return data;
    };

    const posts = await getPosts();

    return {
        posts,
    };
};